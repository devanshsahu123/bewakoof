import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const FOOTER_LINKS = [
  {
    title: "Client Service",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Shipping & Returns", href: "/shipping" },
      { label: "F.A.Q", href: "/faq" },
      { label: "Track Your Order", href: "/track" },
    ],
  },
  {
    title: "The Atelier",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-white pt-24 pb-12">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-24">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/">
              <h2 className="text-3xl font-serif tracking-[0.3em] uppercase mb-8">Noir</h2>
            </Link>
            <p className="text-gray-400 font-light max-w-sm leading-loose mb-10">
              Defining the modern silhouette through a lens of minimal luxury. 
              Crafted for those who value substance as much as style.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><FaInstagram size={18} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><FaFacebookF size={18} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><FaXTwitter size={18} /></Link>
              <Link href="#" className="text-gray-400 hover:text-accent transition-colors"><FaYoutube size={18} /></Link>
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] mb-8 text-accent">
                {group.title}
              </h4>
              <ul className="flex flex-col gap-5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-[13px] text-gray-400 hover:text-white transition-colors tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            © {year} Noir Atelier. All Rights Reserved.
          </p>
          <div className="flex gap-8">
             <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Designed in Paris</span>
             <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Global Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
