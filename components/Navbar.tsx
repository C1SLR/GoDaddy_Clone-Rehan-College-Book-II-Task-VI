"use client";

import { useState, useEffect } from "react";

import {
  Link,
  Button,
} from "@heroui/react";
import { ShoppingCart, Search, Menu, Globe } from "lucide-react";
import { useDomainCart } from "@/store/domainCart";
import { Show, UserButton, SignInButton } from "@clerk/nextjs";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItems = useDomainCart((state) => state.items);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-8">
            <Link href="/" className="font-bold text-2xl text-black shrink-0">
              GoDaddy<span className="text-[#00838C]">Clone</span>
            </Link>
            
            <ul className="hidden lg:flex items-center gap-6">
              <li>
                <Link href="/domains" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                  Domains
                </Link>
              </li>
              <Show when="signed-in">
                <li>
                  <Link href="/dashboard" className="text-sm font-semibold text-[#00838C] hover:text-[#006e75] transition-colors flex items-center gap-1">
                    <Globe className="w-4 h-4" /> My Domains
                  </Link>
                </li>
              </Show>
              <li>
                <Link href="/info/hosting" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                  Websites & Hosting
                </Link>
              </li>
              <li>
                <Link href="/info/webmail" className="text-sm font-semibold text-gray-600 hover:text-black transition-colors">
                  Email & Microsoft 365
                </Link>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button isIconOnly variant="ghost" aria-label="Search" className="text-gray-500 hover:text-black rounded-full">
                <Search className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="flex items-center gap-3 ml-2 border-l border-gray-100 pl-4">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <Button variant="secondary" className="font-bold text-sm bg-[#111111] text-white hover:bg-black px-6 py-2 rounded-xl">
                    Sign In
                  </Button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <UserButton appearance={{
                  elements: {
                    avatarBox: "w-9 h-9 border-2 border-transparent hover:border-[#00838C] transition-all"
                  }
                }} />
              </Show>
            </div>

             {/* Cart Button — custom badge to avoid HeroUI Badge positioning issues */}
            <Link href="/cart" className="ml-2 no-underline">
              <div className="relative group flex items-center gap-2 px-4 py-2 rounded-xl border border-teal-100 bg-teal-50/40 hover:bg-[#00838C]/10 hover:border-[#00838C]/30 transition-all duration-200 cursor-pointer">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-[#00838C] group-hover:scale-110 transition-transform duration-200" />
                  {mounted && cartItems.length > 0 && (
                    <span className="absolute -top-2.5 -right-2.5 min-w-[20px] h-5 flex items-center justify-center px-1 text-[11px] font-black text-white bg-[#00838C] rounded-full shadow-md shadow-teal-900/30 ring-2 ring-white animate-[scaleIn_0.2s_ease-out]">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold text-sm text-[#00838C]">Cart</span>
              </div>
            </Link>

            <div className="lg:hidden">
              <Button isIconOnly variant="ghost" aria-label="Menu" className="rounded-full">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
