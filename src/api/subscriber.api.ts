import { api } from "./api";
import type { Sub, PagedResult, CreateSubPayload, Sim, FilterStatus } from "../types/types";

export async function postSub(data: CreateSubPayload): Promise<void> {
    try {
        await api.post("/subs", data);
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function putSub(id: string, data: Sub): Promise<void> {
    try {
        await api.put(`/subs/${id}`, data);
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function getSub(page: number): Promise<PagedResult<Sub>> {
    try {
        const response = await api.get(`/subs?page=${page}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function deleteSub(id: string): Promise<void> {
    try {
        await api.delete(`/subs/${id}`);
    } catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}

export async function addSim({ subId, tarifId }: { subId: string; tarifId: string }): Promise<void> {
    try {
        await api.post(`/subs/${subId}/sims`, { tarifId });
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function deleteSim({ subId, simId }: { subId: string; simId: string }): Promise<void> {
    try {
        await api.delete(`/subs/${subId}/sims/${simId}`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function editSim({
    subId, simId, tarifId, status,
}: {
    subId: string;
    simId: string;
    tarifId: string;
    status: "active" | "blocked";
}): Promise<void> {
    try {
        await api.put(`/subs/${subId}/sims/${simId}`, { status, tarifId });
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function getSimById({ subId, simId }: { subId: string; simId: string }): Promise<Sim> {
    try {
        const response = await api.get(`/subs/${subId}/sims/${simId}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function searchSub(
    page: number,
    fullName: string,
    phoneNumber: string
): Promise<PagedResult<Sub>> {
    try {
        // ВИПРАВЛЕНО: раніше був if/else — або ім'я, або номер окремо.
        // Тепер завжди передаємо обидва, бекенд сам ігнорує порожні рядки.
        const params = new URLSearchParams({ page: String(page) });
        if (fullName)     params.set("fullName", fullName);
        if (phoneNumber)  params.set("number", phoneNumber);

        const response = await api.get(`/subs/search?${params.toString()}`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}

export async function filterSub(
    page: number,
    simStatus: FilterStatus,
    tarifId: string
): Promise<PagedResult<Sub>> {
    try {
        const response = await api.get(
            `/subs/filter?simStatus=${simStatus}&tarifId=${tarifId}&page=${page}`
        );
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        } else {
            throw "Server error";
        }
    }
}