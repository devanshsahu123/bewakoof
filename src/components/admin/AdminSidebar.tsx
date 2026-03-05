"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiOutlineSquares2X2,
  HiOutlineShoppingBag,
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
  HiOutlineTag,
  HiOutlineArrowLeft,
  HiOutlineXMark,
} from "react-icons/hi2";

const navItems = [
  { icon: HiOutlineSquares2X2, label: "media-upload", href: "/admin/media" }
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 flex flex-col
          bg-gray-900 text-white
          transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0 md:z-auto md:flex-shrink-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black uppercase tracking-tight text-white">
              {process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}
              <sup className="text-[0.5em] font-bold align-super ml-0.5">®</sup>
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-yellow-400 text-gray-900 tracking-widest uppercase">
              Admin
            </span>
          </div>
          {/* Close on mobile */}
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded text-white/60 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <HiOutlineXMark size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Admin navigation">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 px-3 mb-3">
            Main Menu
          </p>
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                      ${
                        isActive
                          ? "bg-yellow-400 text-gray-900 shadow-sm"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <item.icon
                      size={18}
                      strokeWidth={isActive ? 2.2 : 1.75}
                      className="flex-shrink-0"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150"
          >
            <HiOutlineArrowLeft size={14} />
            Back to Site
          </Link>
        </div>
      </aside>
    </>
  );
}
