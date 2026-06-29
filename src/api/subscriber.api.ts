import { api } from "./api";
import { apiRequest } from "./apiHelpers";
import type { Sub, PagedResult, CreateSubPayload, Sim, FilterStatus } from "../types/types";

export function postSub(data: CreateSubPayload) {
    return apiRequest<void>(() => api.post("/subs", data));
}

export function putSub(id: string, data: Sub) {
    return apiRequest<void>(() => api.put(`/subs/${id}`, data));
}

export function getSub(page: number) {
    return apiRequest<PagedResult<Sub>>(() => api.get(`/subs?page=${page}`));
}

export function deleteSub(id: string) {
    return apiRequest<void>(() => api.delete(`/subs/${id}`));
}

export function addSim({ subId, tarifId }: { subId: string; tarifId: string }) {
    return apiRequest<void>(() => api.post(`/subs/${subId}/sims`, { tarifId }));
}

export function deleteSim({ subId, simId }: { subId: string; simId: string }) {
    return apiRequest<void>(() => api.delete(`/subs/${subId}/sims/${simId}`));
}

export function editSim({
    subId, simId, tarifId, status,
}: {
    subId: string;
    simId: string;
    tarifId: string;
    status: "active" | "blocked";
}) {
    return apiRequest<void>(() => api.put(`/subs/${subId}/sims/${simId}`, { status, tarifId }));
}

export function getSimById({ subId, simId }: { subId: string; simId: string }) {
    return apiRequest<Sim>(() => api.get(`/subs/${subId}/sims/${simId}`));
}

export function searchSub(page: number, fullName: string, phoneNumber: string) {
    const params = new URLSearchParams({ page: String(page) });
    if (fullName) params.set("fullName", fullName);
    if (phoneNumber) params.set("number", phoneNumber);

    return apiRequest<PagedResult<Sub>>(() => api.get(`/subs/search?${params.toString()}`));
}

export function filterSub(page: number, simStatus: FilterStatus, tarifId: string) {
    return apiRequest<PagedResult<Sub>>(() =>
        api.get(`/subs/filter?simStatus=${simStatus}&tarifId=${tarifId}&page=${page}`)
    );
}