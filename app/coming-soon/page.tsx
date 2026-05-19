import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@heroui/react";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-4xl font-bold mb-4 text-[#111111]">Coming Soon</h1>
          <p className="text-gray-600 mb-8 text-lg">
            We're working hard to bring this feature to life. Stay tuned for updates!
          </p>
          <Link href="/">
            <Button className="bg-[#00838C] text-white font-bold px-8 py-6 rounded-lg text-lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
