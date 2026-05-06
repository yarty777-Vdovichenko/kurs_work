import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7058/api",
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await axios.post("https://localhost:7058/api/auth/refresh", { refreshToken });
                
                const { accessToken } = response.data;
                localStorage.setItem("accessToken", accessToken);

                original.headers.Authorization = `Bearer ${accessToken}`;
                return api(original);
            } catch {

                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("role");
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);