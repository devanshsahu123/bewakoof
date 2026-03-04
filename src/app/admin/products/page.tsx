import type { Metadata } from "next";

export const metadata: Metadata = { title: "Products | Admin" };

const products = [
  { id: "P001", name: "Classic Oversized Tee",    category: "T-Shirts",   price: "₹899",   stock: 142, status: "Active"   },
  { id: "P002", name: "Baggy Comfort Joggers",    category: "Bottoms",    price: "₹1,299", stock: 78,  status: "Active"   },
  { id: "P003", name: "Vintage Graphic Hoodie",   category: "Hoodies",    price: "₹1,599", stock: 0,   status: "OOS"      },
  { id: "P004", name: "Crop Top Set",             category: "Co-ords",    price: "₹749",   stock: 55,  status: "Active"   },
  { id: "P005", name: "Cargo Shorts",             category: "Bottoms",    price: "₹999",   stock: 30,  status: "Active"   },
  { id: "P006", name: "Tie-Dye Kurta",            category: "Ethnic",     price: "₹1,199", stock: 0,   status: "OOS"      },
  { id: "P007", name: "Puff Sleeve Blouse",       category: "Tops",       price: "₹849",   stock: 200, status: "Active"   },
  { id: "P008", name: "Distressed Jeans",         category: "Bottoms",    price: "₹1,499", stock: 10,  status: "Low Stock"},
  { id: "P009", name: "Dad Sneakers - White",     category: "Footwear",   price: "₹2,199", stock: 22,  status: "Active"   },
  { id: "P010", name: "Floral Co-ord Set",        category: "Co-ords",    price: "₹1,699", stock: 5,   status: "Low Stock"},
];

const statusStyle: Record<string, string> = {
  "Active":    "bg-green-100 text-green-700",
  "OOS":       "bg-red-100 text-red-600",
  "Low Stock": "bg-orange-100 text-orange-600",
};

const categories = ["All", "T-Shirts", "Bottoms", "Hoodies", "Co-ords", "Tops", "Footwear", "Ethnic"];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage your product catalogue</p>
        </div>
        <button className="self-start sm:self-auto px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-xl transition-all duration-150 shadow-sm">
          + Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 ${
                  cat === "All"
                    ? "bg-yellow-400 text-gray-900"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products…"
            className="px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-yellow-400 placeholder-gray-400 w-full sm:w-56 transition-all"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase text-gray-400 font-semibold tracking-wider">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3 hidden md:table-cell">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3 hidden lg:table-cell">Stock</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-6 py-3.5 text-xs text-gray-400 font-mono">{p.id}</td>
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{p.name}</td>
                  <td className="px-6 py-3.5 text-gray-500 hidden md:table-cell">{p.category}</td>
                  <td className="px-6 py-3.5 font-bold text-gray-900">{p.price}</td>
                  <td className="px-6 py-3.5 text-gray-700 hidden lg:table-cell">{p.stock}</td>
                  <td className="px-6 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[p.status]}`}>
                      {p.status}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Showing 10 of 382 products</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  p === 1 ? "bg-yellow-400 text-gray-900" : "text-gray-500 hover:bg-gray-100"
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
