"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUser,
  HiOutlineBars3,
  HiXMark,
  HiOutlineShoppingCart,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/store/authStore";

const mainNavLinks = [
  { label: "MEN", href: "/shop/men" },
  { label: "WOMEN", href: "/shop/women" },
  { label: "MOBILE COVERS", href: "/shop/mobile-covers" },
];

/* ── Reusable: Profile dropdown for desktop navbar ── */
function AuthNavItem() {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isAuthenticated) {
    return (
      <Link
        href="/login"
        className="hidden lg:flex text-black text-[13px] font-[500] hover:text-[#fdd835] transition-colors items-center"
      >
        Login
      </Link>
    );
  }

  // Get initials for avatar
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const handleLogout = () => {
    clearAuth();
    setOpen(false);
    router.push("/");
  };

  return (
    <div ref={ref} className="hidden lg:block relative text-center">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 group py-2"
        aria-label="Profile menu"
      >
        <span className="text-[14px] font-[600] text-[#333] group-hover:text-black transition-colors max-w-[90px] truncate leading-none">
          {user?.name?.split(" ")[0] ?? "Account"}
        </span>
        {/* Chevron */}
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[calc(100%+14px)] w-[220px] bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 z-[200] transition-all duration-200 origin-top ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* Invisible Bridge */}
        <div className="absolute -top-[14px] left-0 w-full h-[14px]" />
        
        <div className="overflow-hidden rounded-xl">
        {/* User info header */}
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <p className="text-[13px] font-[700] text-black truncate">{user?.name ?? "My Account"}</p>
          <p className="text-[11px] text-gray-500 truncate mt-0.5">{user?.email ?? ""}</p>
        </div>
        {/* Menu items */}
        <div className="py-1">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-[500] text-gray-700 hover:bg-[#fafafa] hover:text-black transition-colors"
          >
            <HiOutlineUser size={15} className="shrink-0" />
            My Profile
          </Link>
          <Link
            href="/orders"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] font-[500] text-gray-700 hover:bg-[#fafafa] hover:text-black transition-colors"
          >
            <HiOutlineShoppingCart size={15} className="shrink-0" />
            My Orders
          </Link>
        </div>
        <div className="border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-[13px] font-[500] text-red-500 hover:bg-red-50 transition-colors"
          >
            <HiArrowRightOnRectangle size={15} className="shrink-0" />
            Logout
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile drawer header: guest or logged-in ── */
function MobileDrawerHeader({ closeMenu }: { closeMenu: () => void }) {
  const { isAuthenticated, user, clearAuth } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    closeMenu();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
      {isAuthenticated ? (
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Avatar */}
          <div className="w-[42px] h-[42px] rounded-full bg-black text-white text-[15px] font-[700] flex items-center justify-center shrink-0">
            {user?.name
              ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
              : "U"}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-[700] text-black leading-tight truncate">{user?.name ?? "My Account"}</p>
            <p className="text-[11px] font-[400] text-gray-500 truncate mt-0.5">{user?.email ?? ""}</p>
            <button
              onClick={handleLogout}
              className="text-[11px] font-[600] text-red-500 hover:text-red-700 mt-1 flex items-center gap-1"
            >
              <HiArrowRightOnRectangle size={12} />
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link href="/login" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="bg-white p-2 rounded-full border border-gray-200">
            <HiOutlineUser size={24} className="text-gray-600" />
          </div>
          <div>
            <p className="text-[14px] font-[700] text-black leading-tight">Welcome Guest</p>
            <p className="text-[12px] font-[500] text-gray-500 hover:text-black">Login / Sign Up</p>
          </div>
        </Link>
      )}
      <button
        onClick={closeMenu}
        className="p-1 text-gray-400 hover:text-black ml-2 shrink-0"
      >
        <HiXMark size={24} />
      </button>
    </div>
  );
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { cartCount } = useCart();

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setIsMobileMenuOpen(false); // Close menu if mobile
  };

  return (
    <>
      <header
        className={`w-full bg-white z-[60] transition-shadow duration-300 ${
          isScrolled ? "sticky top-0 shadow-md" : "relative border-b border-gray-200"
        }`}
      >
        {/* Top Promotional Bar (Desktop) */}
        <div className="hidden lg:flex bg-[#eeeeee] text-[#333] text-[11px] font-medium py-1.5 px-6 items-center justify-between tracking-wide">
          <div className="flex gap-4">
            <Link href="/offers" className="hover:underline">Offers</Link>
            <Link href="/fanbook" className="hover:underline">Fanbook</Link>
            <Link href="/apps" className="hover:underline">Download App</Link>
          </div>
          <div className="flex gap-4">
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <Link href="/track" className="hover:underline">Track Order</Link>
          </div>
        </div>

        {/* Main Header Row */}
        <div className="mx-auto max-w-[1400px] px-4 md:px-6">
          <div className="flex h-[60px] md:h-[72px] items-center justify-between">
            {/* Left Section: Menu & Logo */}
            <div className="flex items-center gap-3 lg:gap-8 h-full">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1 -ml-1 text-black hover:text-[#fdd835] transition-colors"
                aria-label="Menu"
              >
                <HiOutlineBars3 className="w-[24px] h-[24px] sm:w-[28px] sm:h-[28px]" />
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center shrink-0">
                <span className="text-[clamp(16px,4.5vw,24px)] font-[900] tracking-widest text-black uppercase sm:translate-y-[2px] mt-0.5 sm:mt-0">
                  {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
                  <span className="text-[clamp(7px,2vw,12px)] font-bold align-top ml-[1px]">®</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full ml-4">
                {mainNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="h-full flex items-center text-[13px] font-[600] tracking-wider text-[#333] hover:text-black border-b-[4px] border-transparent hover:border-[#fdd835] transition-all uppercase px-1"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Right Section: Search & Icons */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Desktop Search Bar */}
              <form onSubmit={handleSearch} className="hidden lg:flex relative w-[320px] xl:w-[450px]">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <HiOutlineMagnifyingGlass size={18} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by product, category or collection"
                  className="w-full bg-[#eaeaea] text-black text-[13px] rounded-md pl-10 pr-4 py-2.5 outline-none focus:bg-white focus:ring-1 focus:ring-gray-300 transition-colors placeholder:text-gray-500"
                />
              </form>

              {/* Vertical Divider */}
              <div className="hidden lg:block w-[1px] h-5 bg-gray-300 mx-1"></div>

              {/* Icons */}
              <div className="flex items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                {/* Mobile Search Icon (only shows when search bar is hidden) */}
                 <button className="lg:hidden text-black p-1">
                   <HiOutlineMagnifyingGlass className="w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
                 </button>

                {/* Auth Section — Login link or Profile dropdown */}
                <AuthNavItem />

                <Link href="/wishlist" className="text-black hover:text-[#fdd835] transition-colors">
                  <HiOutlineHeart className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] stroke-[1.5]" />
                </Link>

                <Link href="/cart" className="text-black hover:text-[#fdd835] transition-colors relative">
                  <HiOutlineShoppingBag className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] stroke-[1.5]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#fdd835] text-black text-[9px] sm:text-[10px] font-bold rounded-full h-[16px] min-w-[16px] sm:h-[18px] sm:min-w-[18px] flex items-center justify-center px-1 transition-all duration-300">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar & Backdrop */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[90] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[85vw] max-w-[320px] bg-white z-[100] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header — auth-aware */}
        <MobileDrawerHeader closeMenu={() => setIsMobileMenuOpen(false)} />

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="py-2">
            <p className="px-5 py-3 text-[11px] font-[600] text-gray-400 uppercase tracking-widest">
              Shop in
            </p>
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-5 py-3.5 text-[14px] font-[600] text-[#333] hover:bg-gray-50 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-gray-100 mx-5 my-2"></div>

          <div className="py-2">
            <Link
              href="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-5 py-3 text-[14px] font-[500] text-gray-600 hover:text-black hover:bg-gray-50"
            >
              My Orders
            </Link>
            <Link
              href="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-5 py-3 text-[14px] font-[500] text-gray-600 hover:text-black hover:bg-gray-50"
            >
              My Wishlist
            </Link>
            <Link
              href="/gift-cards"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-5 py-3 text-[14px] font-[500] text-gray-600 hover:text-black hover:bg-gray-50"
            >
              Gift Cards
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
