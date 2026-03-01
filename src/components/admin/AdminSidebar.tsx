import Link from "next/link";

const navItems = [
  { icon: "📊", label: "Dashboard", href: "/admin/dashboard" },
  { icon: "📦", label: "Orders",    href: "/admin/orders"    },
  { icon: "🛍️", label: "Products",  href: "/admin/products"  },
  { icon: "👥", label: "Users",     href: "/admin/users"     },
  { icon: "💬", label: "Reviews",   href: "/admin/reviews"   },
  { icon: "⚙️", label: "Settings",  href: "/admin/settings"  },
];

export default function AdminSidebar() {
  return (
    <aside className="flex w-[240px] shrink-0 flex-col h-screen overflow-y-auto
                      bg-[#1a1a2e] border-r border-white/[0.07]">
      {/* Logo */}
      <div className="flex items-center gap-2 px-5 py-5 border-b border-white/[0.06]">
        <span className="text-xl">⚡</span>
        <span className="flex-1 text-base font-black text-white tracking-tight">{process.env.NEXT_PUBLIC_APP_NAME || "Siyapaa"}</span>
        <span className="text-[0.6rem] font-bold uppercase tracking-widest px-1.5 py-0.5
                         rounded-full bg-yellow-400/15 text-yellow-400">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1 p-3" aria-label="Admin navigation">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg
                       text-sm font-medium text-white/50
                       transition-all duration-150
                       hover:bg-yellow-400/[0.08] hover:text-yellow-400"
          >
            <span className="w-5 text-center text-base">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Back to site */}
      <div className="px-5 py-4 border-t border-white/[0.06]">
        <Link href="/" className="text-xs text-white/30 transition-colors hover:text-white">
          ← Back to Site
        </Link>
      </div>
    </aside>
  );
}
