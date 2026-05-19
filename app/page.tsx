import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductCards } from "@/components/ProductCards";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="grow">
        <HeroSection />
        <ProductCards />
      </main>
      <Footer />
    </>
  );
}
