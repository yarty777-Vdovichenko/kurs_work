import type { Request } from "../types/types";
import { api } from "./api";

export async function getApplications():Promise<Request[]>{
    try{
        const responce =await api.get("/registration-requests");

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

export async function approveApplications(id:string):Promise<string>{
    try{
        const responce =await api.post(`/registration-requests/${id}/approve`);

        return responce.data.message;
    }
    catch(error:any){
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }    
}

export async function rejectApplications(id:string):Promise<string>{
    try{
        const responce =await api.post(`/registration-requests/${id}/reject`);

        return responce.data.message;
    }
    catch(error:any){
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }    
}