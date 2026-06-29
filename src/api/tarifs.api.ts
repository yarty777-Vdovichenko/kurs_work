import { apiRequest } from "./apiHelpers";
import type { Tarif } from "../types/types";
import { api } from "./api";

export function getTarifs() {
    return apiRequest<Tarif[]>(() => api.get("/tarifs"));
}

export function postTarifs(name: string, internet_capacity: number, minutes: number, additional: string, price: number) {
    return apiRequest<void>(() => api.post("/tarifs", { name, internet_capacity, minutes, additional, price }));
}

export function deleteTarifs(id: string, newTarifId: string) {
    return apiRequest<void>(() => api.delete(`/tarifs/${id}?newTarifId=${newTarifId}`));
}

export function putTarifs(id: string, tarif: Tarif) {
    return apiRequest<void>(() => api.put(`/tarifs/${id}`, {
        name: tarif.name,
        internet_capacity: tarif.internet_capacity,
        minutes: tarif.minutes,
        additional: tarif.additional,
        price: tarif.price
    }));
}