import axiosInstance from "@/lib/axiosInstance";
import type { LoginResponse, User } from "@/types";

export const authService = {
    async login(identifier: string, password: string): Promise<LoginResponse> {
        const { data } = await axiosInstance.post<LoginResponse>("/customer/auth/login", {
            identifier,
            password,
        });
        if (data.token) {
            localStorage.setItem("web_token", data.token);
        }
        return data;
    },

    async logout(): Promise<void> {
        try {
            await axiosInstance.post("/customer/auth/logout");
        } finally {
            localStorage.removeItem("web_token");
        }
    },

};
