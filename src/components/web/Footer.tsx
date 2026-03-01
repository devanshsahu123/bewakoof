import Link from "next/link";

const groups = [
  { title: "Men's Clothing",    items: ["Top Wear", "Bottom Wear", "Activewear", "Winterwear", "Ethnic Wear"] },
  { title: "Women's Clothing",  items: ["Top Wear", "Bottom Wear", "Dresses", "Activewear", "Winterwear"] },
  { title: "Customer Service", items: ["Contact Us", "Track Order", "Return Order", "Cancel Order", "Delivery Info"] },
  { title: "About Us", items: ["Who We Are", "We're Hiring", "Terms & Conditions", "Privacy Policy", "Blog"] },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#111] text-white pt-16 pb-8 border-t-[8px] border-[#FFCE21]">
      <div className="mx-auto max-w-[1400px] px-6">
        {/* Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-16 border-b border-gray-800 pb-16">
          {/* Brand Info */}
          <div className="flex-1 lg:max-w-md">
            <span className="block text-3xl font-[900] tracking-wider mb-6 text-[#FFCE21]">BEWAKOOF<sup className="text-sm">®</sup></span>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 font-medium">
              Bewakoof® is India's leading youth fashion brand, offering customized, quirky, and trendy apparel. We make fashion accessible and expressive.
            </p>
          </div>

          {/* Newsletter */}
          <div className="flex-1 lg:max-w-md bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold mb-2 text-white">Get updates on fun stuff you probably need.</h3>
            <p className="text-sm text-gray-400 mb-6">Sign up for exclusive offers, original stories, activism awareness, events and more.</p>
            <form className="flex item-center gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-transparent border-b border-gray-500 px-2 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#FFCE21] transition-colors"
                required
              />
              <button 
                type="submit" 
                className="bg-[#FFCE21] hover:bg-yellow-400 text-black px-6 py-2 text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Link Groups */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-4">
              <h3 className="text-[14px] font-[800] uppercase tracking-[0.05em] text-[#FFCE21]">
                {g.title}
              </h3>
              <div className="flex flex-col gap-3">
                {g.items.map((item) => (
                  <Link
                    key={item}
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-[13px] text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-800 text-xs text-gray-500 font-medium tracking-wide">
          <p>
            © {year} Bewakoof Brands Pvt. Ltd. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <span>100% SECURE PAYMENT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
