"use client";

import { useEffect } from "react";
import { useDomainCart } from "@/store/domainCart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@heroui/react";
import { CheckCircle, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const clearCart = useDomainCart((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      <main className="grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-xl bg-white p-12 sm:p-20 rounded-[40px] shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Globe className="w-64 h-64" />
          </div>

          <div className="relative z-10">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 mx-auto shadow-inner">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-[#111111] mb-6 tracking-tight">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-500 mb-10 leading-relaxed font-medium">
              Thank you for your purchase. Your domains are being processed and will be available in your dashboard shortly.
            </p>

            <div className="bg-gray-50 rounded-2xl p-6 mb-12 flex items-center justify-between text-left border border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
                <p className="text-green-600 font-black flex items-center gap-1 uppercase text-sm">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                  Confirmed
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Receipt</p>
                <p className="text-[#111111] font-bold text-sm">Sent to your email</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/" className="grow">
                <Button className="w-full bg-[#111111] text-white font-black text-lg py-8 rounded-2xl hover:bg-gray-900 transition-all shadow-xl">
                  Go to Dashboard
                </Button>
              </Link>
              <Link href="/domains" className="grow">
                <Button variant="ghost" className="w-full text-[#00838C] font-black text-lg py-8 rounded-2xl hover:bg-teal-50 border-none flex items-center gap-2">
                  Buy More <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
