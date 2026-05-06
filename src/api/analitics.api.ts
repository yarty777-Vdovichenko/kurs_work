import type { Stats } from "../types/types";
import { api } from "./api";

export async function getStats():Promise<Stats>{
    try{
        const response = await api.get("/subs/stats")
        return response.data
    }
    catch(error:any){
        if (error.response){
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}