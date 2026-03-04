import type { Metadata } from "next";

export const metadata: Metadata = { title: "Users | Admin" };

const users = [
  { id: "U001", name: "Rohit Sharma",  email: "rohit@example.com",  role: "Customer", orders: 12, joined: "Jan 2025",  status: "Active"   },
  { id: "U002", name: "Priya Mehta",   email: "priya@example.com",  role: "Customer", orders: 7,  joined: "Feb 2025",  status: "Active"   },
  { id: "U003", name: "Admin User",    email: "admin@siyapaa.com",  role: "Admin",    orders: 0,  joined: "Dec 2024",  status: "Active"   },
  { id: "U004", name: "Aman Verma",    email: "aman@example.com",   role: "Customer", orders: 3,  joined: "Mar 2025",  status: "Active"   },
  { id: "U005", name: "Sneha Kapoor",  email: "sneha@example.com",  role: "Customer", orders: 21, joined: "Nov 2024",  status: "Active"   },
  { id: "U006", name: "Karan Singh",   email: "karan@example.com",  role: "Customer", orders: 1,  joined: "Feb 2026",  status: "Banned"   },
  { id: "U007", name: "Meera Pillai",  email: "meera@example.com",  role: "Customer", orders: 9,  joined: "Jan 2026",  status: "Active"   },
  { id: "U008", name: "Dev Anand",     email: "dev@example.com",    role: "Customer", orders: 5,  joined: "Dec 2025",  status: "Inactive" },
  { id: "U009", name: "Tanya Rao",     email: "tanya@example.com",  role: "Customer", orders: 18, joined: "Oct 2024",  status: "Active"   },
  { id: "U010", name: "Nikhil Gupta",  email: "nikhil@example.com", role: "Editor",   orders: 0,  joined: "Jan 2026",  status: "Active"   },
];

const roleStyle: Record<string, string> = {
  Admin:    "bg-purple-100 text-purple-700",
  Editor:   "bg-blue-100 text-blue-700",
  Customer: "bg-gray-100 text-gray-600",
};

const statusStyle: Record<string, string> = {
  Active:   "bg-green-100 text-green-700",
  Inactive: "bg-yellow-100 text-yellow-700",
  Banned:   "bg-red-100 text-red-600",
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage all platform users</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150 shadow-sm">
          + Invite User
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Users",  value: "24,810", bg: "bg-blue-50",   text: "text-blue-700"  },
          { label: "Active",       value: "23,402", bg: "bg-green-50",  text: "text-green-700" },
          { label: "Inactive",     value: "1,220",  bg: "bg-yellow-50", text: "text-yellow-700"},
          { label: "Banned",       value: "188",    bg: "bg-red-50",    text: "text-red-600"   },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4 border border-gray-100`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className={`text-2xl font-black ${s.text}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">All Users</h2>
          <input
            type="text"
            placeholder="Search users…"
            className="px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 placeholder-gray-400 w-full sm:w-56 transition-all"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3 hidden md:table-cell">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 hidden lg:table-cell">Orders</th>
                <th className="px-6 py-3 hidden lg:table-cell">Joined</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-gray-900 flex-shrink-0">
                        {u.name[0]}
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-gray-500 hidden md:table-cell">{u.email}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${roleStyle[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-gray-700 hidden lg:table-cell">{u.orders}</td>
                  <td className="px-6 py-3.5 text-gray-400 text-xs hidden lg:table-cell">{u.joined}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">Edit</button>
                      <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors">Ban</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Showing 10 of 24,810 users</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${p === 1 ? "bg-yellow-400 text-gray-900" : "text-gray-500 hover:bg-gray-100"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
