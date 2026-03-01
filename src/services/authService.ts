import axiosInstance from "@/lib/axiosInstance";
import type { LoginResponse, User } from "@/types";

export const authService = {
    async login(email: string, password: string): Promise<LoginResponse> {
        const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
            email,
            password,
        });
        if (data.token) {
            localStorage.setItem("bewakoof_token", data.token);
        }
        return data;
    },

    async logout(): Promise<void> {
        try {
            await axiosInstance.post("/auth/logout");
        } finally {
            localStorage.removeItem("bewakoof_token");
        }
    },

    async getMe(): Promise<User> {
        const { data } = await axiosInstance.get<User>("/auth/me");
        return data;
    },
};
