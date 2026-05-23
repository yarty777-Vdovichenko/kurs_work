import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token && !config.url?.includes("/auth/refresh")) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

let isRefreshing = false;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (original.url?.includes("/auth/refresh")) {
            isRefreshing = false;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("role");
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !isRefreshing) {
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await api.post("/auth/refresh", { refreshToken });

                const { accessToken, refreshToken: newRefreshToken } = response.data;
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                isRefreshing = false;
                original.headers.Authorization = `Bearer ${accessToken}`;
                return api(original);
            } catch {
                isRefreshing = false;
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);