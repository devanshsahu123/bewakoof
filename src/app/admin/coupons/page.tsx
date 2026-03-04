import type { Metadata } from "next";

export const metadata: Metadata = { title: "Coupons | Admin" };

const coupons = [
  { code: "SAVE10",    type: "Percentage", value: "10%",   min: "₹500",  uses: "824/1000", expiry: "31 Mar 2026", status: "Active"  },
  { code: "FLAT200",   type: "Flat",       value: "₹200",  min: "₹999",  uses: "342/500",  expiry: "15 Mar 2026", status: "Active"  },
  { code: "WELCOME20", type: "Percentage", value: "20%",   min: "₹0",    uses: "∞",         expiry: "01 Jan 2027", status: "Active"  },
  { code: "SALE50",    type: "Percentage", value: "50%",   min: "₹1,499",uses: "200/200",  expiry: "28 Feb 2026", status: "Expired" },
  { code: "FIRST100",  type: "Flat",       value: "₹100",  min: "₹399",  uses: "1200/∞",   expiry: "30 Jun 2026", status: "Active"  },
  { code: "SUMMER30",  type: "Percentage", value: "30%",   min: "₹799",  uses: "0/300",     expiry: "30 Apr 2026", status: "Draft"   },
  { code: "HOLI25",    type: "Percentage", value: "25%",   min: "₹499",  uses: "560/600",  expiry: "21 Mar 2026", status: "Active"  },
];

const statusStyle: Record<string, string> = {
  Active:  "bg-green-100 text-green-700",
  Expired: "bg-red-100 text-red-600",
  Draft:   "bg-gray-100 text-gray-500",
};

const typeStyle: Record<string, string> = {
  Percentage: "bg-purple-100 text-purple-700",
  Flat:       "bg-blue-100 text-blue-700",
};

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Coupons</h1>
          <p className="text-sm text-gray-500 mt-0.5">Create and manage discount coupons</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150 shadow-sm">
          + New Coupon
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Coupons", value: "7",    color: "bg-yellow-50" },
          { label: "Active",        value: "5",    color: "bg-green-50"  },
          { label: "Total Uses",    value: "3,126",color: "bg-blue-50"   },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 border border-gray-100`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">All Coupons</h2>
          <input
            type="text"
            placeholder="Search coupons…"
            className="px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 placeholder-gray-400 w-full sm:w-52 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Discount</th>
                <th className="px-6 py-3 hidden md:table-cell">Min. Order</th>
                <th className="px-6 py-3 hidden lg:table-cell">Usage</th>
                <th className="px-6 py-3 hidden md:table-cell">Expiry</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {coupons.map((c) => (
                <tr key={c.code} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3.5 font-mono font-bold text-gray-900 tracking-wider text-xs">{c.code}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${typeStyle[c.type]}`}>
                      {c.type}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 font-bold text-gray-900">{c.value}</td>
                  <td className="px-6 py-3.5 text-gray-500 hidden md:table-cell">{c.min}</td>
                  <td className="px-6 py-3.5 text-gray-500 hidden lg:table-cell">{c.uses}</td>
                  <td className="px-6 py-3.5 text-gray-400 text-xs hidden md:table-cell">{c.expiry}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                      <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Delete</button>
                    </div>
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
