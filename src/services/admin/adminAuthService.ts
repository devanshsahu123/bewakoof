import axiosInstance from "@/lib/axiosInstance";
import type { LoginResponse, User } from "@/types";

export const adminAuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await axiosInstance.post<LoginResponse>("/admin/auth/login", {
      email,
      password,
    });
    
    // Extract token from Authorization header if present
    const authHeader = response.headers["authorization"];
    let token = response.data.token;
    
    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
    
    return {
      ...response.data,
      token: token || "",
    };
  },
};
