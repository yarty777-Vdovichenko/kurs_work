import type { Stats } from "../types/types";
import { api } from "./api";
import { apiRequest } from "./apiHelpers";

export async function getStats(){
    return apiRequest<Stats>(()=> api.get("/subs/stats"))
}