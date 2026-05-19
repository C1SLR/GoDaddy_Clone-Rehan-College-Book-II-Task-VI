"use client";

import { Card, Button } from "@heroui/react";
import { Globe, Server, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function ProductCards() {
  const products = [
    {
      title: "Domains",
      description: "Claim your slice of the internet. Get a professional domain name to build your brand.",
      price: "Starts at $0.01/yr",
      icon: <Globe className="w-8 h-8 text-[#00838C]" />,
      action: "Search Domains",
      link: "/"
    },
    {
      title: "Web Hosting",
      description: "Fast, secure, and reliable hosting that grows with your business.",
      price: "Starts at $4.99/mo",
      icon: <Server className="w-8 h-8 text-[#00838C]" />,
      action: "See Plans",
      link: "/info/hosting"
    },
    {
      title: "Professional Email",
      description: "Earn trust from your customers with an email address that matches your domain.",
      price: "Starts at $1.99/mo",
      icon: <Mail className="w-8 h-8 text-[#00838C]" />,
      action: "Get Email",
      link: "/info/webmail"
    },
    {
      title: "Website Security",
      description: "Protect your site and keep customers safe with SSL Certificates and malware scans.",
      price: "Starts at $5.99/mo",
      icon: <ShieldCheck className="w-8 h-8 text-[#00838C]" />,
      action: "Secure Site",
      link: "/info/trust-center"
    }
  ];

  return (
    <section className="py-16 px-6 sm:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center">What's next for your business?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <Card.Header className="flex gap-3 pt-6 px-6">
              <div className="p-3 bg-teal-50 rounded-lg">
                {product.icon}
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold">{product.title}</p>
              </div>
            </Card.Header>
            <Card.Content className="px-6 py-4 text-gray-600">
              <p>{product.description}</p>
              <p className="mt-4 font-semibold text-black">{product.price}</p>
            </Card.Content>
            <Card.Footer className="px-6 pb-6">
              <Link href={product.link} className="w-full">
                <Button 
                  className="w-full bg-black text-white font-semibold flex items-center justify-center"
                >
                  {product.action}
                </Button>
              </Link>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
}
