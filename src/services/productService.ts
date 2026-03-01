import axiosInstance from "@/lib/axiosInstance";
import type { Product, PaginatedResponse } from "@/types";

export const productService = {
    async getAll(page = 1, limit = 20): Promise<PaginatedResponse<Product>> {
        const { data } = await axiosInstance.get<PaginatedResponse<Product>>(
            "/products",
            { params: { page, limit } }
        );
        return data;
    },

    async getById(id: string): Promise<Product> {
        const { data } = await axiosInstance.get<Product>(`/products/${id}`);
        return data;
    },

    async create(payload: Partial<Product>): Promise<Product> {
        const { data } = await axiosInstance.post<Product>("/products", payload);
        return data;
    },

    async update(id: string, payload: Partial<Product>): Promise<Product> {
        const { data } = await axiosInstance.put<Product>(`/products/${id}`, payload);
        return data;
    },

    async remove(id: string): Promise<void> {
        await axiosInstance.delete(`/products/${id}`);
    },
};
