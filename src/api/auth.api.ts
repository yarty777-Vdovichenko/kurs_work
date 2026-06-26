import { api } from "./api";

export async function register(name: string, role: string, email: string, password: string) {
    try {
        const response = await api.post("/auth/register", { name, role, email, password });

        return response.data.message;
    } catch (error: any) {
        throw error.response?.data?.message ?? "Server error";
    }
}

export async function login(email: string, password: string) {
    try {
        const response = await api.post("/auth/login", { email, password });
        const { accessToken, role, ...userData } = response.data;

        return { accessToken, role, ...userData };
    } catch (error: any) {
        throw error.response?.data?.message ?? "Server error";
    }
}

export async function logOut() {
    await api.post("/auth/logout");
}

export async function refreshAccessToken() {
    const res = await api.post("/auth/refresh");
    return res.data.accessToken;
}