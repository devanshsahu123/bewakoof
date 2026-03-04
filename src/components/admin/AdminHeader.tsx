"use client";

import { HiOutlineBell, HiOutlineMagnifyingGlass, HiOutlineBars3 } from "react-icons/hi2";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 flex-shrink-0 sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 size={22} />
        </button>
        <div className="hidden sm:flex flex-col">
          <span className="text-sm font-semibold text-gray-800">{greeting} 👋</span>
          <span className="text-xs text-gray-400">Admin Panel</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className="relative hidden sm:flex items-center">
          <span className="absolute left-3 text-gray-400 pointer-events-none">
            <HiOutlineMagnifyingGlass size={15} />
          </span>
          <input
            type="text"
            placeholder="Search…"
            aria-label="Admin search"
            className="pl-9 pr-4 py-2 w-44 md:w-60 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 transition-all placeholder-gray-400"
          />
        </div>

        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <HiOutlineBell size={20} strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-sm font-bold text-gray-900 cursor-pointer select-none"
          aria-label="Admin user"
        >
          A
        </div>
      </div>
    </header>
  );
}
