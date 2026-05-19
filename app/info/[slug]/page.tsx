import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

interface InfoContent {
  title: string;
  subtitle: string;
  content: string[];
}

const INFO_DATA: Record<string, InfoContent> = {
  "about-us": {
    title: "About Us",
    subtitle: "Empowering everyday entrepreneurs since 2026.",
    content: [
      "At GoDaddyClone, we believe that every individual and business deserves a powerful online presence. Our mission is to provide the tools and support needed to turn ideas into reality.",
      "With over a decade of experience in the industry, we have helped millions of customers find the perfect domain name and build stunning websites.",
      "Our team is dedicated to innovation, reliability, and customer success. Whether you're a first-time blogger or a growing enterprise, we're here to help you make your mark on the web."
    ]
  },
  "contact-us": {
    title: "Contact Us",
    subtitle: "We're here to help, 24/7/365.",
    content: [
      "Have questions? Our award-winning support team is just a call or click away.",
      "Phone: 1-800-GODADDY-CLONE",
      "Email: support@godaddyclone.com",
      "Address: 123 Tech Way, Silicon Valley, CA 94025",
      "You can also reach out to us via our live chat available on the homepage."
    ]
  },
  "careers": {
    title: "Careers",
    subtitle: "Join the team that's building the future of the web.",
    content: [
      "We're looking for passionate individuals who want to make a difference. At GoDaddyClone, you'll work with cutting-edge technology and a diverse team of experts.",
      "Current Openings:",
      "• Senior Fullstack Developer (Next.js/Node.js)",
      "• UI/UX Designer (Framer Motion focus)",
      "• Customer Success Specialist",
      "• Cloud Infrastructure Engineer"
    ]
  },
  "trust-center": {
    title: "Trust Center",
    subtitle: "Your security and privacy are our top priorities.",
    content: [
      "We implement industry-leading security measures to protect your data and your customers' information.",
      "Our infrastructure is monitored 24/7, and we use advanced encryption for all transactions.",
      "Learn more about our compliance with GDPR, CCPA, and other global privacy standards."
    ]
  },
  "privacy-policy": {
    title: "Privacy Policy",
    subtitle: "How we handle your information.",
    content: [
      "This policy describes the types of information we may collect from you and our practices for collecting, using, maintaining, protecting, and disclosing that information.",
      "We collect information that you provide to us directly, such as when you create an account or contact support.",
      "We also collect information automatically as you navigate through the site, including IP addresses and cookies."
    ]
  },
  "legal": {
    title: "Legal Agreements",
    subtitle: "The fine print, made clear.",
    content: [
      "Your use of our services is subject to our Universal Terms of Service and specific service agreements.",
      "We strive to make our legal documents as easy to understand as possible while ensuring full protection for our users and our company.",
      "Please review these documents carefully before using our platform."
    ]
  },
  "cookies": {
    title: "Cookie Policy",
    subtitle: "How we use cookies to improve your experience.",
    content: [
      "Cookies are small text files that are stored on your device when you visit our website.",
      "We use essential cookies for the operation of the site, and optional cookies for analytics and personalized marketing.",
      "You can manage your cookie preferences at any time through your browser settings."
    ]
  },
  "hosting": {
    title: "Web Hosting",
    subtitle: "Reliable, fast, and secure hosting for every project.",
    content: [
      "Our hosting plans are designed to grow with you. From simple shared hosting to powerful dedicated servers, we have the right solution.",
      "Features include 99.9% uptime guarantee, free SSL certificates, and 1-click WordPress installation.",
      "Our global data centers ensure that your site loads quickly for visitors anywhere in the world."
    ]
  },
  "websites": {
    title: "Websites",
    subtitle: "Build a professional site in minutes.",
    content: [
      "Our website builder is intuitive and powerful. No coding skills required.",
      "Choose from hundreds of designer-made templates and customize them to fit your brand.",
      "Every site built with GoDaddyClone is mobile-responsive and SEO-optimized from day one."
    ]
  },
  "wordpress": {
    title: "Managed WordPress",
    subtitle: "WordPress made easy, fast, and secure.",
    content: [
      "Focus on your content while we handle the technical details. We take care of updates, security, and performance tuning.",
      "Includes a suite of premium plugins and themes for free.",
      "Our WordPress experts are available 24/7 to help you with any questions."
    ]
  },
  "community": {
    title: "Community",
    subtitle: "Connect, learn, and grow with other entrepreneurs.",
    content: [
      "Join our forums to ask questions and share your experiences with other GoDaddyClone users.",
      "Participate in webinars and local events hosted by our experts.",
      "Access a wealth of knowledge in our community-driven blog and knowledge base."
    ]
  },
  "report-abuse": {
    title: "Report Abuse",
    subtitle: "Help us keep the web safe.",
    content: [
      "If you encounter any website hosted by us that violates our terms of service, please report it here.",
      "We investigate all reports of spam, malware, phishing, and copyright infringement.",
      "Your report helps us maintain a high standard of quality and safety for everyone."
    ]
  },
  "resources": {
    title: "Resources",
    subtitle: "Tools and guides to help you succeed.",
    content: [
      "Access our extensive library of tutorials, e-books, and video courses.",
      "Use our business name generator, logo maker, and SEO analysis tools.",
      "Stay updated with the latest trends in web design and digital marketing."
    ]
  },
  "webmail": {
    title: "Webmail",
    subtitle: "Professional email for your professional brand.",
    content: [
      "Access your professional email from any device, anywhere in the world.",
      "Features include advanced spam filtering, large storage capacity, and seamless integration with our other services.",
      "Collaborate with your team using shared calendars and contacts."
    ]
  },
  "whois": {
    title: "WHOIS Search",
    subtitle: "Find out who owns a domain.",
    content: [
      "Our WHOIS search tool allows you to look up registration information for any domain name.",
      "Check domain availability and expiration dates.",
      "Protect your own privacy with our domain privacy and protection services."
    ]
  },
  "icann-confirmation": {
    title: "ICANN Confirmation",
    subtitle: "Maintaining the integrity of the domain system.",
    content: [
      "As an ICANN-accredited registrar, we are required to maintain accurate contact information for all domain registrants.",
      "Learn how to verify your domain registration and update your contact details.",
      "Understand the roles and responsibilities of domain owners under ICANN policies."
    ]
  },
  "corporate-domains": {
    title: "Corporate Domains",
    subtitle: "Enterprise-grade domain management.",
    content: [
      "Protect your brand with a comprehensive domain strategy managed by our corporate team.",
      "Benefit from dedicated account management and custom reporting.",
      "Ensure maximum security for your domain portfolio with advanced lock and monitoring features."
    ]
  }
};

export default async function InfoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = INFO_DATA[slug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="grow py-16 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-[#111111] mb-4">{data.title}</h1>
            <p className="text-xl text-gray-600 font-medium">{data.subtitle}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border border-gray-100">
            {data.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(INFO_DATA).map((slug) => ({
    slug,
  }));
}
