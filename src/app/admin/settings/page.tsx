import type { Metadata } from "next";

export const metadata: Metadata = { title: "Settings | Admin" };

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500 mt-0.5">Configure your store & admin preferences</p>
      </div>

      {/* Store Info */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900">🏪 Store Information</h2>
          <p className="text-xs text-gray-400 mt-0.5">Basic details about your store</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Store Name",    id: "storeName",    type: "text",  placeholder: "Siyapaa", defaultValue: "Siyapaa" },
            { label: "Support Email", id: "storeEmail",   type: "email", placeholder: "support@siyapaa.com", defaultValue: "support@siyapaa.com" },
            { label: "Phone",         id: "storePhone",   type: "tel",   placeholder: "+91 98765 43210", defaultValue: "" },
            { label: "GST Number",    id: "gstNumber",    type: "text",  placeholder: "22AAAAA0000A1Z5", defaultValue: "" },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="text-xs font-semibold text-gray-600">{f.label}</label>
              <input
                id={f.id}
                type={f.type}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label htmlFor="address" className="text-xs font-semibold text-gray-600">Store Address</label>
            <textarea
              id="address"
              rows={2}
              placeholder="123, Commerce Street, Mumbai, Maharashtra — 400001"
              className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all resize-none"
            />
          </div>
        </div>
        <div className="px-6 pb-5 flex justify-end">
          <button className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150">
            Save Changes
          </button>
        </div>
      </section>

      {/* Payment Settings */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900">💳 Payment Settings</h2>
          <p className="text-xs text-gray-400 mt-0.5">Configure payment gateway keys</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Razorpay Key ID",     id: "razorKeyId",     placeholder: "rzp_live_xxxxxxxxxxxx"     },
            { label: "Razorpay Key Secret", id: "razorKeySecret", placeholder: "••••••••••••••••"            },
            { label: "Currency",            id: "currency",       placeholder: "INR"                        },
            { label: "Free Shipping Above", id: "freeShip",       placeholder: "₹499"                      },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="text-xs font-semibold text-gray-600">{f.label}</label>
              <input
                id={f.id}
                type="text"
                placeholder={f.placeholder}
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all"
              />
            </div>
          ))}
        </div>
        <div className="px-6 pb-5 flex justify-end">
          <button className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150">
            Save Payment Info
          </button>
        </div>
      </section>

      {/* Notification Preferences */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900">🔔 Notifications</h2>
          <p className="text-xs text-gray-400 mt-0.5">Choose what you get notified about</p>
        </div>
        <div className="p-6 space-y-4">
          {[
            { label: "New Orders",        desc: "Get notified whenever a new order is placed",       id: "notifOrders",    on: true  },
            { label: "New User Sign-ups", desc: "Alert when a new customer creates an account",     id: "notifUsers",     on: true  },
            { label: "Low Stock Alerts",  desc: "Notify when product stock falls below 10 units",   id: "notifStock",     on: true  },
            { label: "Review Submissions",desc: "Alert on new product reviews pending moderation",  id: "notifReviews",   on: false },
            { label: "Failed Payments",   desc: "Get alerted on payment failures or disputes",      id: "notifPayments",  on: true  },
          ].map((n) => (
            <div key={n.id} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">{n.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{n.desc}</p>
              </div>
              <button
                className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
                  n.on ? "bg-yellow-400" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={n.on}
              >
                <span
                  className={`inline-block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 my-1 ${
                    n.on ? "translate-x-5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
        <div className="px-6 pb-5 flex justify-end">
          <button className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150">
            Save Preferences
          </button>
        </div>
      </section>

      {/* Security */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-sm font-bold text-gray-900">🔒 Security</h2>
          <p className="text-xs text-gray-400 mt-0.5">Change your admin password</p>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Current Password", id: "currPwd" },
            { label: "New Password",     id: "newPwd"  },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="text-xs font-semibold text-gray-600">{f.label}</label>
              <input
                id={f.id}
                type="password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300/30 placeholder-gray-400 transition-all"
              />
            </div>
          ))}
        </div>
        <div className="px-6 pb-5 flex justify-end">
          <button className="px-5 py-2.5 bg-gray-900 hover:bg-gray-700 text-white font-bold text-sm rounded-xl transition-all duration-150">
            Update Password
          </button>
        </div>
      </section>
    </div>
  );
}
