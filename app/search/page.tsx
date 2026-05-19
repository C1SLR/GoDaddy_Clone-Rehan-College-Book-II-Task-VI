"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button, Card } from "@heroui/react";
import { useDomainCart } from "@/store/domainCart";
import { Check, ShoppingCart } from "lucide-react";

function SearchContent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  
  const addItem = useDomainCart((state) => state.addItem);
  const items = useDomainCart((state) => state.items);

  // Mock domain results based on the search query
  const domains = [
    { name: `${query || "yourdomain"}.com`, price: 0.01, termYears: 1 },
    { name: `${query || "yourdomain"}.co`, price: 11.99, termYears: 1 },
    { name: `${query || "yourdomain"}.net`, price: 14.99, termYears: 1 },
    { name: `${query || "yourdomain"}.org`, price: 9.99, termYears: 1 },
    { name: `${query || "yourdomain"}.io`, price: 39.99, termYears: 1 },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 pb-32">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <h1 className="text-3xl font-bold">Search Results for "{query}"</h1>
        <Button 
          variant="outline" 
          className="font-semibold border-gray-300"
          onClick={() => router.push("/")}
        >
          New Search
        </Button>
      </div>
      
      <div className="space-y-6">
        {domains.map((domain) => {
          const inCart = mounted && items.some((item) => item.name === domain.name);
          
          return (
            <Card key={domain.name} className="border border-gray-200 shadow-sm hover:shadow-md hover:border-[#00838C] transition-all overflow-hidden">
              <Card.Content className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex p-3 bg-green-50 rounded-full shrink-0">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{domain.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">AVAILABLE</span>
                      <span className="text-sm text-gray-500">Perfect for your brand</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-4 md:pt-0">
                  <div className="text-left md:text-right">
                    <div className="flex items-baseline gap-1 md:justify-end">
                      <span className="text-2xl font-black">${domain.price}</span>
                      <span className="text-sm text-gray-500 font-normal">/yr</span>
                    </div>
                    <p className="text-xs text-gray-400">Regular price $19.99</p>
                  </div>
                  
                  <Button 
                    className={`font-bold px-8 py-6 rounded-lg transition-all ${
                      inCart 
                      ? 'bg-green-600 text-white shadow-inner' 
                      : 'bg-[#00838C] text-white hover:bg-[#006e75] shadow-lg shadow-teal-100'
                    }`}
                    onClick={() => {
                      if (!inCart) {
                        addItem({
                          id: domain.name,
                          name: domain.name,
                          price: domain.price,
                          termYears: domain.termYears
                        });
                      }
                    }}
                    isDisabled={inCart}
                  >
                    {inCart ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-5 h-5" /> Added
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" /> Add to Cart
                      </span>
                    )}
                  </Button>
                </div>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Floating Checkout Button */}
      {mounted && items.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
          <Button 
            className="bg-[#111111] text-white font-bold text-lg px-10 py-8 shadow-2xl rounded-full flex items-center gap-4 hover:scale-105 active:scale-95 transition-all border border-gray-700"
            onClick={() => router.push("/cart")}
          >
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#00838C] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#111111]">
                {items.length}
              </span>
            </div>
            <span>View Cart & Checkout</span>
            <div className="w-px h-6 bg-gray-700 mx-1" />
            <span className="text-[#00838C]">${items.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
          </Button>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow">
        <Suspense fallback={<div className="p-12 text-center text-xl font-bold">Loading results...</div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
