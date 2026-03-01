import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api",
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

/* Request interceptor – attach auth token if present */
axiosInstance.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("web_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/* Response interceptor – handle 401 globally */
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                localStorage.removeItem("web_token");
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
