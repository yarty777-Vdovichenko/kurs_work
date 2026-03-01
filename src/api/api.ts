import axios from "axios";

const api = axios.create({baseURL:"https://localhost:7058/api",headers:{"Content-Type":"application/json"}});

//Auth

export async function register(name:string,email:string,password:string)
{
    const responce = await api.post("/auth/register",{name,email,password});
    return responce.data;
}

export async function login(email:string,password:string) {
    const responce = await api.post("/auth/login",{email,password});
    return responce.data;
}

