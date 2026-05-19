import { Link } from "@heroui/react";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-12 px-6 sm:px-12 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <div>
          <h3 className="font-bold text-lg mb-4">About GoDaddyClone</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/info/about-us" className="text-gray-400 hover:text-white">About Us</Link></li>
            <li><Link href="/info/contact-us" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            <li><Link href="/info/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
            <li><Link href="/info/trust-center" className="text-gray-400 hover:text-white">Trust Center</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Help Center</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/info/community" className="text-gray-400 hover:text-white">Community</Link></li>
            <li><Link href="/info/report-abuse" className="text-gray-400 hover:text-white">Report Abuse</Link></li>
            <li><Link href="/info/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/info/webmail" className="text-gray-400 hover:text-white">Webmail</Link></li>
            <li><Link href="/info/whois" className="text-gray-400 hover:text-white">WHOIS</Link></li>
            <li><Link href="/info/icann-confirmation" className="text-gray-400 hover:text-white">ICANN Confirmation</Link></li>
            <li><Link href="/info/corporate-domains" className="text-gray-400 hover:text-white">Corporate Domains</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Shopping</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/" className="text-gray-400 hover:text-white">Domain Search</Link></li>
            <li><Link href="/info/websites" className="text-gray-400 hover:text-white">Websites</Link></li>
            <li><Link href="/info/wordpress" className="text-gray-400 hover:text-white">WordPress</Link></li>
            <li><Link href="/info/hosting" className="text-gray-400 hover:text-white">Hosting</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Copyright © 2026 GoDaddyClone Operating Company, LLC. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="/info/legal" className="text-gray-500 hover:text-white">Legal</Link>
          <Link href="/info/privacy-policy" className="text-gray-500 hover:text-white">Privacy Policy</Link>
          <Link href="/info/cookies" className="text-gray-500 hover:text-white">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
