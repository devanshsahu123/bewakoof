/* ========================================
   Global TypeScript Types
   ======================================== */

export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
    avatar?: string;
    createdAt: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    discountedPrice?: number;
    images: string[];
    category: string;
    tags: string[];
    stock: number;
    rating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface Order {
    id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
}

export interface LoginResponse {
    token: string;
    user: User;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ApiError {
    message: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}
