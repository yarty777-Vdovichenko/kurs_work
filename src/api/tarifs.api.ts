import type { Tarif } from "../types/types";
import { api } from "./api";

export async function getTarifs() {
    try{
        const responce =await api.get("/tarifs");

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

export async function postTarifs(Name:string,Internet_capacity:number,Minutes:number,Additional:string,Price:number) {
    try {
        const response = await api.post("/tarifs", { name:Name, internet_capacity:Internet_capacity, minutes:Minutes, additional:Additional,price:Price });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message);
        }
        throw new Error("Server error");
    }
}

export async function deleteTarifs(id:string) {
    try{
        const responce = await api.delete(`/tarifs/${id}`);

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
export async function putTarifs(id: string, tarif:Tarif) {
    try {
        const response = await api.put(`/tarifs/${id}`, {
            name: tarif.name,
            internet_capacity: tarif.internet_capacity,
            minutes: tarif.minutes,
            additional: tarif.additional,
            price: tarif.price
        });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}