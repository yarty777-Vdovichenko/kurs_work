import axios from "axios";
import { store } from "../store/store";
import { clearAuth, setAccessToken } from "../store/authSlice";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;

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
            store.dispatch(clearAuth())
            window.location.href = "/login";
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !isRefreshing) {
            isRefreshing = true;

            try {
                const response = await api.post("/auth/refresh");

                const { accessToken} = response.data;
                store.dispatch(setAccessToken(accessToken))

                isRefreshing = false;
                original.headers.Authorization = `Bearer ${accessToken}`;
                return api(original);
            } catch {
                isRefreshing = false;
                store.dispatch(clearAuth())
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);