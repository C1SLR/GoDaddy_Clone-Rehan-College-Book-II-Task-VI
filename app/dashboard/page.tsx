"use client";

import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, Button, Chip } from "@heroui/react";
import { Globe, Settings, ShieldCheck, Zap, ArrowRight, ExternalLink, Search } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />
      
      <main className="grow max-w-7xl mx-auto w-full py-12 px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#111111] mb-2 tracking-tight">
              Welcome back, {user?.firstName || "there"}!
            </h1>
            <p className="text-gray-500 font-medium">Manage your domains and online identity from one place.</p>
          </div>
          <Link href="/domains">
            <Button className="bg-[#00838C] text-white font-black px-8 py-7 rounded-xl shadow-lg shadow-teal-900/10 hover:bg-[#006e75] transition-all flex items-center gap-2">
              <Search className="w-5 h-5" /> Find a New Domain
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Domains List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-[#111111] flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#00838C]" /> My Domains
            </h2>
            
            {/* Sample Domain Card */}
            <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-3xl bg-white overflow-hidden p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-teal-50 rounded-2xl">
                    <Globe className="w-8 h-8 text-[#00838C]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#111111]">example-business.com</h3>
                    <div className="flex items-center gap-3 mt-2">
                      <Chip color="success" size="sm" className="font-bold text-[10px] uppercase">Active</Chip>
                      <span className="text-sm text-gray-400 font-medium">Expires May 2027</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button isIconOnly variant="ghost" className="rounded-xl text-gray-400 hover:text-[#111111] hover:bg-gray-50 border-none">
                    <Settings className="w-5 h-5" />
                  </Button>
                  <Button className="bg-black text-white font-bold rounded-xl px-6">
                    Manage
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="border border-dashed border-gray-200 shadow-none rounded-3xl bg-transparent p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <Zap className="w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium mb-6">Need more space for your ideas?</p>
              <Link href="/domains">
                <Button variant="ghost" className="text-[#00838C] font-black border-none hover:bg-teal-50">
                  Register Another Domain <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>

          {/* Sidebar / Quick Actions */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-[#111111] mb-6">Account Summary</h2>
              <Card className="border border-gray-100 shadow-sm rounded-3xl bg-white p-8 space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Total Domains</span>
                  <span className="font-black text-[#111111]">1</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Auto-renew</span>
                  <span className="text-green-600 font-bold uppercase text-xs">Enabled</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-medium">Security Score</span>
                  <div className="flex items-center gap-1 text-[#00838C]">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-black">Excellent</span>
                  </div>
                </div>
              </Card>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#111111] mb-6">Recommended for you</h2>
              <Card className="border border-none bg-linear-to-br from-[#00838C] to-[#005a61] text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <h3 className="text-xl font-black mb-2">Professional Email</h3>
                  <p className="text-teal-50 text-sm mb-6 leading-relaxed opacity-90">
                    Build trust with an email address that matches your domain name.
                  </p>
                  <Button className="bg-white text-[#00838C] font-black w-full rounded-xl py-6 flex items-center justify-center gap-2">
                    Learn More <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
