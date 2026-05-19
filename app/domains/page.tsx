"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button, Card, Accordion, Chip } from "@heroui/react";
import { Search, Globe, ShieldCheck, Zap, Star, Check, ShoppingCart, ArrowRight } from "lucide-react";
import { useDomainCart } from "@/store/domainCart";

const POPULAR_TLDS = [
  { name: ".com", price: 0.01, originalPrice: 19.99, promo: "Best Seller" },
  { name: ".net", price: 10.99, originalPrice: 14.99, promo: "Popular" },
  { name: ".org", price: 7.99, originalPrice: 12.99, promo: "Trusted" },
  { name: ".ai", price: 59.99, originalPrice: 79.99, promo: "Tech" },
  { name: ".co", price: 11.99, originalPrice: 16.99, promo: "Global" },
  { name: ".io", price: 39.99, originalPrice: 49.99, promo: "Dev" },
];

const FAQS = [
  {
    question: "How do I choose the best domain name?",
    answer: "Keep it short, memorable, and easy to spell. Try to use keywords related to your business and stick with popular extensions like .com if possible."
  },
  {
    question: "What is domain privacy protection?",
    answer: "Domain privacy hides your personal contact information from the public WHOIS database, protecting you from spam, identity theft, and unwanted solicitations."
  },
  {
    question: "Can I transfer my domain to GoDaddyClone?",
    answer: "Yes! Transferring is easy and usually includes a 1-year extension of your registration. Our team will guide you through the process step-by-step."
  },
  {
    question: "Why do I need a professional domain?",
    answer: "A professional domain builds trust with your customers, helps with SEO, and gives you a permanent home on the web that you fully control."
  }
];

export default function DomainsPage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const [query, setQuery] = useState("");
  const router = useRouter();
  const addItem = useDomainCart((state) => state.addItem);
  const items = useDomainCart((state) => state.items);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="grow">
        {/* Hero Search Section */}
        <section className="bg-linear-to-b from-[#111111] to-[#1a1a1a] text-white py-28 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Globe className="w-[800px] h-[800px] absolute -right-40 -top-40" />
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-5xl sm:text-7xl font-black mb-8 tracking-tight leading-tight">
              Get the domain you <br /><span className="text-[#00838C]">actually</span> want.
            </h1>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
              Join 20M+ customers and find your perfect name today with the world's largest domain registrar.
            </p>

            <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto items-center gap-2 bg-white rounded-2xl p-2 shadow-2xl border border-white/10">
              <div className="grow flex items-center bg-white rounded-md px-4">
                <Search className="w-6 h-6 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Type the domain you want"
                  className="w-full bg-transparent text-black text-xl outline-none py-5 font-semibold placeholder:text-gray-300"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="bg-[#00838C] text-white font-black text-lg px-12 py-8 rounded-xl hover:bg-[#006e75] transition-all shadow-lg shadow-teal-900/20"
              >
                Search
              </Button>
            </form>

            <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm font-bold">
              <span className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-[#00838C]">.com</span> $0.01
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-[#00838C]">.net</span> $10.99
              </span>
              <span className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10 backdrop-blur-sm">
                <span className="text-[#00838C]">.org</span> $7.99
              </span>
            </div>
          </div>
        </section>

        {/* Popular TLDs Pricing Grid */}
        <section className="py-24 px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">Start small. Dream big.</h2>
              <p className="text-gray-500 text-xl max-w-2xl mx-auto">Grab one of these popular extensions and build your empire with the right address.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {POPULAR_TLDS.map((tld) => {
                const inCart = mounted && items.some(item => item.name === `yourname${tld.name}`);
                return (
                  <Card key={tld.name} className="p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group overflow-visible relative flex flex-col bg-white rounded-3xl">
                    <div className="absolute -top-3 right-8 z-20">
                      <Chip color="accent" className="font-bold px-4 py-1.5 uppercase text-[10px] tracking-widest shadow-md">
                        {tld.promo}
                      </Chip>
                    </div>
                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-4xl font-black text-[#111111]">{tld.name}</h3>
                      <div className="text-right">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-gray-400 line-through text-sm font-medium">${tld.originalPrice}</span>
                          <span className="text-3xl font-black text-[#111111]">${tld.price}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter mt-1">for the first year</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 mb-10 font-medium leading-relaxed">The gold standard of domain extensions. Trusted by millions worldwide.</p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-50">
                      <Button 
                        className={`w-full py-8 font-black text-lg rounded-2xl transition-all flex items-center justify-center gap-3 ${
                          inCart 
                          ? 'bg-green-600 text-white shadow-inner' 
                          : 'bg-[#111111] text-white hover:bg-[#00838C] shadow-lg shadow-gray-200'
                        }`}
                        onClick={() => {
                          if (!inCart) {
                            addItem({
                              id: `yourname${tld.name}`,
                              name: `yourname${tld.name}`,
                              price: tld.price,
                              termYears: 1
                            });
                          }
                        }}
                      >
                        {inCart ? (
                          <>
                            <Check className="w-6 h-6" />
                            Added
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-6 h-6" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-6 bg-white border-y border-gray-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
                Everything you need to <span className="text-[#00838C]">succeed</span> online.
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="p-4 bg-teal-50 rounded-2xl h-fit">
                    <ShieldCheck className="w-8 h-8 text-[#00838C]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Free Privacy Protection</h4>
                    <p className="text-gray-600 leading-relaxed">Keep your personal info private and away from spammers. Included with every eligible domain.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="p-4 bg-blue-50 rounded-2xl h-fit">
                    <Zap className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Lightning Fast Setup</h4>
                    <p className="text-gray-600 leading-relaxed">Your domain will be live and ready for your website or email in minutes, not days.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="p-4 bg-purple-50 rounded-2xl h-fit">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Expert 24/7 Support</h4>
                    <p className="text-gray-600 leading-relaxed">Real humans are here to help you around the clock. No bots, just experts.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 rounded-3xl p-12 text-white relative overflow-hidden group shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-64 h-64" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-[#00838C] text-[#00838C]" />)}
                </div>
                <p className="text-3xl font-medium mb-12 italic leading-relaxed">
                  "GoDaddyClone made it so easy to find my perfect domain. The process was fast, and the support was incredible!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#00838C] rounded-full flex items-center justify-center font-black text-2xl">JD</div>
                  <div>
                    <p className="font-bold text-xl">John Doe</p>
                    <p className="text-gray-400">Founder, TechStart</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust & Stats */}
        <section className="py-20 bg-[#111111] text-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div>
              <p className="text-5xl font-black text-[#00838C] mb-2">82M+</p>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Domains Registered</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#00838C] mb-2">20M+</p>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Happy Customers</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#00838C] mb-2">100+</p>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Extensions Available</p>
            </div>
            <div>
              <p className="text-5xl font-black text-[#00838C] mb-2">24/7</p>
              <p className="text-gray-400 font-bold uppercase tracking-wider text-sm">Award-Winning Support</p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black text-center mb-16">Frequently Asked Questions</h2>
            <Accordion>
              {FAQS.map((faq, index) => (
                <Accordion.Item key={index}>
                  <Accordion.Heading>
                    <Accordion.Trigger className="text-xl font-bold py-6 hover:text-[#00838C] transition-colors">
                      {faq.question}
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel className="pb-6 text-gray-600 text-lg leading-relaxed">
                    {faq.answer}
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-[#00838C] text-white overflow-hidden relative">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-5xl sm:text-6xl font-black mb-8">Ready to make your own way?</h2>
            <p className="text-xl mb-12 font-medium opacity-90 max-w-2xl mx-auto">
              Join millions of entrepreneurs who trust GoDaddyClone to build their brand online.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-black text-white font-black text-xl px-12 py-8 rounded-xl hover:bg-gray-900 transition-all shadow-2xl"
              >
                Find My Domain
              </Button>
              <Button 
                variant="outline"
                className="bg-transparent border-2 border-white text-white font-black text-xl px-12 py-8 rounded-xl hover:bg-white/10 transition-all"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
