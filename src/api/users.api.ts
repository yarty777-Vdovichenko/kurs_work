import { api } from "./api";
import{ type User, type Role } from "../types/types";
import { apiRequest } from "./apiHelpers";

export async function getUsers() {
    return apiRequest<User[]>(()=> api.get("/users"))  
}

export async function deleteUser(id:string) {
    return apiRequest<void>(()=> api.delete(`/users/${id}`));
}
export async function patchUser(id: string, data: { name?: string; email?: string; role?: Role; password?: string }) {
    return apiRequest<void>(()=> api.patch(`/users/${id}`, data));
}