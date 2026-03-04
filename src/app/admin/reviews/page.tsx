import type { Metadata } from "next";

export const metadata: Metadata = { title: "Reviews | Admin" };

const reviews = [
  { id: "R001", customer: "Rohit Sharma",  product: "Oversized Tee",   rating: 5, comment: "Absolutely love the fit and fabric quality. Super comfortable for all-day wear.", date: "4 Mar 2026", status: "Pending"  },
  { id: "R002", customer: "Priya Mehta",   product: "Baggy Joggers",   rating: 4, comment: "Great joggers! Just needed washing before use. Color is perfect.",                date: "3 Mar 2026", status: "Approved" },
  { id: "R003", customer: "Aman Verma",    product: "Graphic Hoodie",  rating: 2, comment: "Quality is average. Printing started to fade after first wash.",                  date: "3 Mar 2026", status: "Pending"  },
  { id: "R004", customer: "Sneha Kapoor",  product: "Crop Top Set",    rating: 5, comment: "Best co-ord set I have bought. Fits true to size!",                              date: "2 Mar 2026", status: "Approved" },
  { id: "R005", customer: "Karan Singh",   product: "Cargo Shorts",    rating: 1, comment: "Worst product I ordered. Received a different item.",                            date: "2 Mar 2026", status: "Rejected" },
  { id: "R006", customer: "Meera Pillai",  product: "Tie-Dye Kurta",   rating: 4, comment: "Beautiful colors and lightweight fabric. Ideal for summer.",                     date: "1 Mar 2026", status: "Approved" },
  { id: "R007", customer: "Tanya Rao",     product: "Distressed Jeans",rating: 3, comment: "Decent quality but the sizing runs a bit large.",                                date: "1 Mar 2026", status: "Pending"  },
];

const statusStyle: Record<string, string> = {
  Pending:  "bg-yellow-100 text-yellow-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-600",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= rating ? "text-yellow-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Reviews</h1>
          <p className="text-sm text-gray-500 mt-0.5">Moderate customer product reviews</p>
        </div>
        <div className="flex items-center gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                f === "All"
                  ? "bg-yellow-400 text-gray-900"
                  : "text-gray-500 bg-white border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total",    value: "7",   color: "bg-gray-50"    },
          { label: "Pending",  value: "3",   color: "bg-yellow-50"  },
          { label: "Approved", value: "3",   color: "bg-green-50"   },
          { label: "Rejected", value: "1",   color: "bg-red-50"     },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl p-4 border border-gray-100`}>
            <p className="text-xs text-gray-500 font-medium">{s.label}</p>
            <p className="text-2xl font-black text-gray-900">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Review cards */}
      <div className="space-y-3">
        {reviews.map((r) => (
          <div key={r.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              {/* Left info */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-xs font-bold text-gray-900 flex-shrink-0">
                  {r.customer[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-900">{r.customer}</p>
                  <p className="text-xs text-gray-400">{r.product} · {r.date}</p>
                  <div className="mt-1">
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed max-w-xl">{r.comment}</p>
                </div>
              </div>

              {/* Right: status + actions */}
              <div className="flex items-center gap-2 flex-shrink-0 ml-12 sm:ml-0">
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[r.status]}`}>
                  {r.status}
                </span>
                {r.status === "Pending" && (
                  <>
                    <button className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded-lg transition-colors">
                      Approve
                    </button>
                    <button className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">
                      Reject
                    </button>
                  </>
                )}
                {r.status !== "Pending" && (
                  <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold rounded-lg transition-colors">
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
