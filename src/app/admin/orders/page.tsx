import type { Metadata } from "next";

export const metadata: Metadata = { title: "Orders | Admin" };

const orders = [
  { id: "#10240", customer: "Rohit Sharma",  product: "Oversized Tee",         amount: "₹899",   date: "4 Mar 2026", status: "Delivered" },
  { id: "#10239", customer: "Priya Mehta",   product: "Baggy Joggers",          amount: "₹1,299", date: "4 Mar 2026", status: "Shipped"   },
  { id: "#10238", customer: "Aman Verma",    product: "Graphic Hoodie",         amount: "₹1,599", date: "3 Mar 2026", status: "Pending"   },
  { id: "#10237", customer: "Sneha Kapoor",  product: "Crop Top Set",           amount: "₹749",   date: "3 Mar 2026", status: "Delivered" },
  { id: "#10236", customer: "Karan Singh",   product: "Cargo Shorts",           amount: "₹999",   date: "2 Mar 2026", status: "Cancelled" },
  { id: "#10235", customer: "Meera Pillai",  product: "Tie-Dye Kurti",          amount: "₹1,199", date: "2 Mar 2026", status: "Shipped"   },
  { id: "#10234", customer: "Dev Anand",     product: "Puff Sleeve Blouse",     amount: "₹849",   date: "1 Mar 2026", status: "Delivered" },
  { id: "#10233", customer: "Tanya Rao",     product: "Distressed Jeans",       amount: "₹1,499", date: "1 Mar 2026", status: "Pending"   },
  { id: "#10232", customer: "Nikhil Gupta",  product: "Dad Sneakers",           amount: "₹2,199", date: "28 Feb 2026", status: "Delivered"},
  { id: "#10231", customer: "Pooja Iyer",    product: "Floral Co-ord Set",      amount: "₹1,699", date: "28 Feb 2026", status: "Shipped"  },
];

const statusStyle: Record<string, string> = {
  Delivered: "bg-green-100 text-green-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

const filterTabs = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Orders</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all customer orders</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150 shadow-sm">
          Export CSV ↓
        </button>
      </div>

      {/* Filter tabs + Search */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  tab === "All"
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Search */}
          <input
            type="text"
            placeholder="Search by ID or customer…"
            className="px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 placeholder-gray-400 w-full sm:w-60 transition-all"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3 hidden lg:table-cell">Product</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3 hidden md:table-cell">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3.5 font-bold text-gray-900">{o.id}</td>
                  <td className="px-6 py-3.5 text-gray-700">{o.customer}</td>
                  <td className="px-6 py-3.5 text-gray-500 hidden lg:table-cell">{o.product}</td>
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{o.amount}</td>
                  <td className="px-6 py-3.5 text-gray-400 text-xs hidden md:table-cell">{o.date}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors">
                      View →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Showing 10 of 1,240 orders</p>
          <div className="flex items-center gap-1">
            {[1,2,3,"…",124].map((p, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  p === 1
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
