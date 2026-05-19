"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@heroui/react";
import { XCircle, ShoppingCart, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-xl bg-white p-12 sm:p-20 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-[#111111] mb-6 tracking-tight">
              Payment Cancelled
            </h1>
            
            <p className="text-xl text-gray-500 mb-12 leading-relaxed font-medium">
              Your transaction was not completed. No charges were made. Don't worry, your items are still safe in your cart.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => router.push("/cart")}
                className="grow bg-[#00838C] text-white font-black text-lg py-8 rounded-2xl hover:bg-[#006e75] transition-all shadow-xl flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" /> Return to Cart
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")}
                className="grow text-gray-400 font-bold text-lg py-8 rounded-2xl hover:bg-gray-50 border-none"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
