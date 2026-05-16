"use client";

import { useAuth } from "@/store/authStore";
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Clock
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Total Revenue", value: "₹2,45,600", icon: DollarSign, trend: "+12.5%", color: "bg-emerald-50 text-emerald-600", positive: true },
    { label: "Active Orders", value: "154", icon: ShoppingBag, trend: "+4.3%", color: "bg-blue-50 text-blue-600", positive: true },
    { label: "Total Customers", value: "1,240", icon: Users, trend: "-2.1%", color: "bg-violet-50 text-violet-600", positive: false },
    { label: "Avg. Order Value", value: "₹1,594", icon: TrendingUp, trend: "+8.7%", color: "bg-orange-50 text-orange-600", positive: true },
  ];

  const recentOrders = [
    { id: "ORD-9842", customer: "Rahul Sharma", product: "Classic Polo T-Shirt", amount: "₹899", status: "Delivered", time: "2 hours ago" },
    { id: "ORD-9841", customer: "Priya Singh", product: "Oversized Hoodie", amount: "₹1,499", status: "Processing", time: "4 hours ago" },
    { id: "ORD-9840", customer: "Amit Patel", product: "Slim Fit Denims", amount: "₹2,199", status: "Shipped", time: "5 hours ago" },
    { id: "ORD-9839", customer: "Sneha Kapur", product: "Graphic Tee", amount: "₹599", status: "Pending", time: "1 day ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.firstName || 'Admin'}!</h1>
          <p className="text-gray-500">Here's what's happening with your store today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-100">
            Create Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend}
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Recent Orders</h3>
            <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order, i) => (
                  <tr key={i} className="text-sm">
                    <td className="py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="py-4 text-gray-600">{order.customer}</td>
                    <td className="py-4 text-gray-600">{order.product}</td>
                    <td className="py-4 font-semibold text-gray-900">{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' :
                        order.status === 'Processing' ? 'bg-blue-50 text-blue-600' :
                        order.status === 'Shipped' ? 'bg-amber-50 text-amber-600' :
                        'bg-gray-50 text-gray-600'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-6">Activity Feed</h3>
            <div className="space-y-6">
              {[
                { icon: Package, text: "New product 'Linen Shirt' added", time: "30 min ago", color: "text-indigo-600 bg-indigo-50" },
                { icon: Users, text: "New customer registered", time: "1 hour ago", color: "text-violet-600 bg-violet-50" },
                { icon: Clock, text: "Store maintenance completed", time: "5 hours ago", color: "text-gray-600 bg-gray-50" }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`p-2 h-fit rounded-lg ${item.color}`}>
                    <item.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-100 transition-colors">
              Show more activity
            </button>
          </div>

          <div className="p-6 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Upgrade to Pro</h4>
              <p className="text-indigo-100 text-sm mb-4">Get access to advanced analytics and unlimited products.</p>
              <button className="px-4 py-2 bg-white text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-50 transition-colors">
                Learn More
              </button>
            </div>
            <TrendingUp className="absolute -right-4 -bottom-4 text-indigo-500 opacity-20 w-32 h-32 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
