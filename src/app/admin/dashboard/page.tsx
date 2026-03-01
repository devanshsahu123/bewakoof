import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard | Admin" };

const stats = [
  { label: "Total Orders", value: "1,240",  icon: "📦", change: "+12%" },
  { label: "Revenue",      value: "₹4.8L",  icon: "💰", change: "+8%"  },
  { label: "Products",     value: "382",    icon: "🛍️", change: "+3%"  },
  { label: "Users",        value: "24,810", icon: "👥", change: "+5%"  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-3xl font-extrabold text-white">Dashboard</h1>
      <p className="mb-8 text-sm text-white/40">Welcome back, Admin 👋</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="relative flex items-center gap-4 rounded-2xl
                       border border-yellow-400/10 bg-[#1a1a2e] p-5
                       transition-all duration-200
                       hover:border-yellow-400/40 hover:-translate-y-0.5"
          >
            {/* icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center
                            rounded-xl bg-yellow-400/10 text-2xl">
              {s.icon}
            </div>

            {/* text */}
            <div>
              <p className="text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-0.5">
                {s.label}
              </p>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
            </div>

            {/* change badge */}
            <span className="absolute top-4 right-4 rounded-full bg-green-500/15
                             px-2 py-0.5 text-[0.65rem] font-bold text-green-400">
              {s.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
