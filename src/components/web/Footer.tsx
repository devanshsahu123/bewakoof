import Link from "next/link";

const groups = [
  { title: "Men's Clothing",   items: ["Top Wear", "Bottom Wear", "Activewear", "Winterwear", "Ethnic Wear"] },
  { title: "Women's Clothing", items: ["Top Wear", "Bottom Wear", "Dresses", "Activewear", "Winterwear"] },
  { title: "Customer Service", items: ["Contact Us", "Track Order", "Return Order", "Cancel Order", "Delivery Info"] },
  { title: "About Us",         items: ["Who We Are", "We're Hiring", "Terms & Conditions", "Privacy Policy", "Blog"] },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#111] text-white pt-12 md:pt-16 pb-8 border-t-[6px] border-[#fdd835]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">

        {/* Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-16 pb-10 md:pb-16 mb-10 md:mb-12 border-b border-gray-800">

          {/* Brand Info */}
          <div className="w-full lg:max-w-xs xl:max-w-sm">
            <span className="block text-2xl md:text-3xl font-[900] tracking-wide mb-4 text-[#fdd835]">
              BEWAKOOF<sup className="text-sm">®</sup>
            </span>
            <p className="text-sm text-gray-400 leading-relaxed">
              India&apos;s leading youth fashion brand — offering quirky, customized, and trendy apparel that&apos;s boldly you.
            </p>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:flex-1 lg:max-w-lg bg-white/5 rounded-xl border border-white/10 p-5 sm:p-6">
            <h3 className="text-base font-bold mb-1 text-white">Get updates on fun stuff.</h3>
            <p className="text-sm text-gray-400 mb-5">Exclusive deals, new arrivals, and more — right in your inbox.</p>
            {/* Stacked on mobile, inline on sm+ */}
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 min-w-0 bg-transparent border border-gray-600 rounded-md px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#fdd835] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#fdd835] hover:bg-yellow-400 text-black px-5 py-2.5 text-sm font-bold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link Groups — 1 col mobile, 2 col sm, 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3">
              <h3 className="text-[13px] font-[800] uppercase tracking-widest text-[#fdd835] mb-1">
                {g.title}
              </h3>
              <div className="flex flex-col gap-2.5">
                {g.items.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[13px] text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-gray-800 text-xs text-gray-500 tracking-wide text-center sm:text-left">
          <p>© {year} Bewakoof Brands Pvt. Ltd. All rights reserved.</p>
          <p className="font-semibold text-gray-400">100% SECURE PAYMENT</p>
        </div>

      </div>
    </footer>
  );
}
