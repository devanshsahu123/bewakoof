import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Dashboard | Admin" };

const stats = [
  { label: "Total Orders", value: "1,240", icon: "📦", change: "+12%", up: true, bg: "bg-yellow-50", iconBg: "bg-yellow-100" },
  { label: "Revenue",      value: "₹4.8L", icon: "💰", change: "+8%",  up: true, bg: "bg-pink-50",   iconBg: "bg-pink-100"   },
  { label: "Products",     value: "382",   icon: "🛍️", change: "+3%",  up: true, bg: "bg-blue-50",   iconBg: "bg-blue-100"   },
  { label: "Users",        value: "24,810",icon: "👥", change: "+5%",  up: true, bg: "bg-green-50",  iconBg: "bg-green-100"  },
];

const recentOrders = [
  { id: "#10231", customer: "Rohit Sharma",  product: "Oversized Tee",   amount: "₹899",   status: "Delivered" },
  { id: "#10230", customer: "Priya Mehta",   product: "Baggy Joggers",   amount: "₹1,299", status: "Shipped"   },
  { id: "#10229", customer: "Aman Verma",    product: "Graphic Hoodie",  amount: "₹1,599", status: "Pending"   },
  { id: "#10228", customer: "Sneha Kapoor",  product: "Crop Top Set",    amount: "₹749",   status: "Delivered" },
  { id: "#10227", customer: "Karan Singh",   product: "Cargo Shorts",    amount: "₹999",   status: "Cancelled" },
];

const statusStyle: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

const quickLinks = [
  { label: "Add Product",  href: "/admin/products", icon: "➕" },
  { label: "View Orders",  href: "/admin/orders",   icon: "📦" },
  { label: "Manage Users", href: "/admin/users",    icon: "👥" },
  { label: "Add Coupon",   href: "/admin/coupons",  icon: "🏷️" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back, Admin 👋 — here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`${s.bg} rounded-2xl p-5 flex items-center gap-4 border border-gray-100 shadow-sm`}
          >
            <div className={`${s.iconBg} w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>
              {s.icon}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-gray-500 font-medium truncate">{s.label}</p>
              <p className="text-xl font-black text-gray-900">{s.value}</p>
              <span className={`text-xs font-semibold ${s.up ? "text-green-600" : "text-red-500"}`}>
                {s.up ? "▲" : "▼"} {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickLinks.map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-yellow-400 hover:bg-yellow-50 hover:text-gray-900 transition-all duration-150 shadow-sm"
          >
            <span>{q.icon}</span>
            {q.label}
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-bold text-gray-900">Recent Orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3 hidden md:table-cell">Product</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3 font-bold text-gray-900">{o.id}</td>
                  <td className="px-6 py-3 text-gray-700">{o.customer}</td>
                  <td className="px-6 py-3 text-gray-500 hidden md:table-cell">{o.product}</td>
                  <td className="px-6 py-3 font-semibold text-gray-900">{o.amount}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[o.status]}`}
                    >
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
