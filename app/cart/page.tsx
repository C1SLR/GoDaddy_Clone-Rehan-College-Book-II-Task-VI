"use client";

import { useState, useEffect } from "react";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useDomainCart } from "@/store/domainCart";
import { Button, Card } from "@heroui/react";
import { Trash2, ShoppingCart, Globe, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, SignInButton } from "@clerk/nextjs";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const items = useDomainCart((state) => state.items);
  const removeItem = useDomainCart((state) => state.removeItem);
  const total = useDomainCart((state) => state.total());
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isSignedIn } = useAuth();

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create checkout session");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error: any) {
      console.error(error);
      alert(`Payment Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      
      {!mounted ? (
        <main className="grow max-w-6xl mx-auto w-full py-16 px-6 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-[#00838C] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 font-bold">Loading your cart...</p>
          </div>
        </main>
      ) : (
        <main className="grow max-w-6xl mx-auto w-full py-16 px-6 flex flex-col lg:flex-row gap-12 animate-in fade-in duration-300">
          {/* Cart Items */}
          <div className="grow">
            <div className="flex items-baseline gap-4 mb-10">
              <h1 className="text-4xl font-black text-black dark:text-white">Your Cart</h1>
              <span className="text-gray-400 font-bold text-xl">({items.length} items)</span>
            </div>
            
            {items.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <ShoppingCart className="w-10 h-10 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Your cart is empty</h2>
                <p className="text-gray-500 mb-10 max-w-xs mx-auto">Looks like you haven't added any domains yet. Let's find you the perfect one!</p>
                <Button 
                  className="bg-[#00838C] text-white font-black px-10 py-7 rounded-xl shadow-lg shadow-teal-900/10 hover:bg-[#006e75] transition-all"
                  onClick={() => router.push("/domains")}
                >
                  Search Domains
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {items.map((item) => (
                  <Card key={item.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white overflow-hidden">
                    <Card.Content className="flex flex-col sm:flex-row sm:items-center justify-between p-8 gap-6">
                      <div className="flex items-center gap-6">
                        <div className="p-4 bg-teal-50 rounded-2xl shrink-0">
                          <Globe className="w-8 h-8 text-[#00838C]" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-black text-gray-900">{item.name}</h2>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase tracking-wider">Domain Registration</span>
                            <span className="text-sm text-gray-400 font-medium">{item.termYears} Year Term</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-10 border-t sm:border-t-0 pt-6 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-2xl font-black text-black dark:text-white">${item.price}</p>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1">Renews at $19.99</p>
                        </div>
                        <Button 
                          isIconOnly 
                          variant="ghost" 
                          className="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          aria-label="Remove item"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-6 h-6" />
                        </Button>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
                <Button 
                  variant="ghost" 
                  className="text-[#00838C] font-bold mt-4"
                  onClick={() => router.push("/domains")}
                >
                  + Add more items
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-[400px]">
            <Card className="border border-gray-100 shadow-xl rounded-3xl sticky top-24 bg-white overflow-hidden">
              <Card.Content className="p-10">
                <h2 className="text-2xl font-black mb-8 text-black dark:text-white">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-black dark:text-white font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Estimated Taxes</span>
                    <span className="text-black dark:text-white font-bold">$0.00</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>ICANN Fees</span>
                    <span className="text-black dark:text-white font-bold">$0.00</span>
                  </div>
                </div>
                
                <div className="h-px bg-gray-100 dark:bg-gray-800 w-full mb-8" />
                
                <div className="flex justify-between items-baseline mb-10">
                  <span className="text-gray-900 dark:text-gray-100 font-black text-xl uppercase tracking-tight">Total</span>
                  <div className="text-right">
                    <span className="text-4xl font-black text-black dark:text-white">${total.toFixed(2)}</span>
                    <p className="text-xs text-gray-400 font-bold mt-1">USD</p>
                  </div>
                </div>

                {isSignedIn ? (
                  <Button 
                    className="w-full bg-[#00838C] text-white font-black text-xl py-9 rounded-2xl shadow-xl shadow-teal-900/20 hover:bg-[#006e75] active:scale-[0.98] transition-all"
                    isDisabled={items.length === 0 || isLoading}
                    onClick={handleCheckout}
                  >
                    {isLoading ? "Redirecting to Stripe..." : "I'm Ready to Pay"}
                  </Button>
                ) : (
                  <SignInButton mode="modal">
                    <Button 
                      className="w-full bg-[#111111] text-white font-black text-xl py-9 rounded-2xl shadow-xl hover:bg-black active:scale-[0.98] transition-all"
                      isDisabled={items.length === 0}
                    >
                      Sign In to Checkout
                    </Button>
                  </SignInButton>
                )}
                
                <div className="mt-8 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure Checkout</span>
                </div>
              </Card.Content>
            </Card>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
}
