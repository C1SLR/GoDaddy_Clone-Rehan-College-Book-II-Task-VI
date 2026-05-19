import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

// ── Server-side price truth ────────────────────────────────────────
// Prices MUST be validated on the server. Never trust client-sent prices.
const DOMAIN_PRICES: Record<string, number> = {
  ".com": 0.01,
  ".net": 10.99,
  ".org": 7.99,
  ".ai": 59.99,
  ".co": 11.99,
  ".io": 39.99,
};

const DEFAULT_PRICE = 9.99; // Fallback for search-result domains
const MAX_CART_ITEMS = 20;
const DOMAIN_NAME_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;

function getServerPrice(domainName: string): number {
  const tld = domainName.substring(domainName.lastIndexOf("."));
  return DOMAIN_PRICES[tld] ?? DEFAULT_PRICE;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;
    const headersList = await headers();
    const origin = headersList.get("origin");

    // ── Input validation ─────────────────────────────────────────
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty or invalid." },
        { status: 400 }
      );
    }

    if (items.length > MAX_CART_ITEMS) {
      return NextResponse.json(
        { error: `Maximum ${MAX_CART_ITEMS} items allowed per checkout.` },
        { status: 400 }
      );
    }

    // ── Validate & build line items with SERVER-SIDE prices ──────
    const line_items = items.map((item: any) => {
      // Validate required fields exist and are correct types
      if (
        typeof item.name !== "string" ||
        typeof item.termYears !== "number" ||
        item.termYears < 1 ||
        item.termYears > 10
      ) {
        throw new Error("Invalid item data.");
      }

      // Sanitize domain name
      const name = item.name.trim().toLowerCase();
      if (!DOMAIN_NAME_REGEX.test(name)) {
        throw new Error(`Invalid domain name: ${name}`);
      }

      // Use the SERVER price, not the client price
      const serverPrice = getServerPrice(name);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name,
            description: `${item.termYears} Year Domain Registration`,
          },
          unit_amount: Math.round(serverPrice * 100), // Stripe expects cents
        },
        quantity: 1,
      };
    });

    // ── Validate origin to prevent open-redirect attacks ─────────
    const allowedOrigins = [
      "http://localhost:3000",
      process.env.NEXT_PUBLIC_SITE_URL,
    ].filter(Boolean);

    const safeOrigin = allowedOrigins.includes(origin ?? "")
      ? origin
      : allowedOrigins[0];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${safeOrigin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${safeOrigin}/cart`,
      metadata: {
        domainNames: items
          .map((i: any) => String(i.name).trim().toLowerCase())
          .join(", "),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[STRIPE_ERROR]", error);

    // In production, never leak internal error details to the client
    const isDev = process.env.NODE_ENV === "development";
    const message = isDev
      ? error instanceof Error
        ? error.message
        : "Internal Server Error"
      : "Something went wrong. Please try again.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
