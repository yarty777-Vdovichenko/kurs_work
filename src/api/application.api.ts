import type { Request } from "../types/types";
import { api } from "./api";
import { apiRequest } from "./apiHelpers";

export async function getApplications(){
    return apiRequest<Request[]>(()=>api.get("/registration-requests"))
}

export async function approveApplications(id:string){
    return apiRequest<string>(()=> api.post(`/registration-requests/${id}/approve`));   
}

export async function rejectApplications(id:string){
    return apiRequest<string>(()=>api.post(`/registration-requests/${id}/reject`)); 
}