import type { CustomerProduct, CustomerProductsResponse } from "@/types";

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001/api/v1";

/**
 * Fetch products from the customer-facing API.
 * Uses native fetch so it works in both Server and Client components.
 * Throws on non-2xx responses.
 */
export async function fetchCustomerProducts(
    page = 1,
    limit = 20
): Promise<CustomerProduct[]> {
    const url = `${API_BASE}/customer/products/?page=${page}&limit=${limit}`;

    const res = await fetch(url, {
        // Revalidate every 60 seconds (ISR-friendly)
        next: { revalidate: 60 },
        headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const json: CustomerProductsResponse = await res.json();
    return json.data;
}
