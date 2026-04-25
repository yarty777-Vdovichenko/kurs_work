import { api } from "./api";
import type { Sub,PagedResult } from "../types/types";

export async function postSub(fullName: string): Promise<void> {
    try {
        await api.post("/subs", { fullName });
    } catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}

export async function putSub(id: string, data: { fullName: string }): Promise<void> {
    try {
        await api.put(`/subs/${id}`, data);
    } catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}





export async function getSub(page: number): Promise<PagedResult<Sub>> {
    try {
        const responce = await api.get(`/subs?page=${page}`)
        return responce.data;
    }
    catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        }
        else {
            throw "Server error"
        }
    }
}

export async function searchSubsByName(name:string):Promise<Sub[]>{
    try{
        const responce = await api.get(`subs/search?fullName=${name}`);
        return responce.data;
    }
    catch(error:any){
        if(error.response){
            throw error.response.data.message
        }else{
            throw "Server error"
        }
    }
}


export async function filterSubs({ simStatus, tarifId }: { simStatus: string; tarifId: number }) {
    try{
        const responce = await api.get(`subs/filter?simStatus=${simStatus}&tarifId=${tarifId}`)
        return responce.data
    }
    catch(error:any){
        if(error.response){
            throw error.response.data.message;
        }
        else{
            throw "Server error"
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