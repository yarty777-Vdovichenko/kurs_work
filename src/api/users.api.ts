import { api } from "./api";
import type{ Role } from "../types/types";

export async function getUsers() {
    try{
        const responce =await api.get("/users");

        return responce.data;
    }
    catch(error:any){
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }    
}

export async function deleteUser(id:string) {
    try{
        const responce = await api.delete(`/users/${id}`);

        return responce.data;
    }
    catch(error:any){
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}
export async function patchUser(id: string, data: { name?: string; email?: string; role?: Role; password?: string }) {
    try {
        const response = await api.patch(`/users/${id}`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}