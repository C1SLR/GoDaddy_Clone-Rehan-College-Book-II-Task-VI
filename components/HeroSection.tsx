"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { Search } from "lucide-react";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="bg-[#111111] text-white py-20 px-6 sm:px-12 flex flex-col items-center text-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 tracking-tight">
          Make your own way.
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-10">
          Everything you need to create a website, sell online, and reach
          customers.
        </p>

        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-3xl mx-auto items-center gap-2 bg-white rounded-lg p-2 shadow-xl"
        >
          <div className="grow flex items-center bg-white rounded-md px-3">
            <Search className="w-6 h-6 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Type the domain you want"
              className="w-full bg-transparent text-black text-lg outline-none py-3"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="bg-[#00838C] text-white font-bold text-lg px-8 py-6 rounded-md hover:bg-[#006e75]"
          >
            Search Domain
          </Button>
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            .com starts at $0.01/1st yr
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            .org starts at $7.99/1st yr
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            .net starts at $10.99/1st yr
          </span>
        </div>
      </div>
    </section>
  );
}
