import axios from "axios";

const api = axios.create({baseURL:"https://localhost:7058/api",headers:{"Content-Type":"application/json"}});

//Auth

export async function register(name:string,email:string,password:string)
{
    const responce = await api.post("/auth/register",{name,email,password});
    const {accessToken, ...userData}=responce.data;
    localStorage.setItem("accessToken",accessToken);

    return userData;
}

export async function login(email:string,password:string) {
    const responce = await api.post("/auth/login",{email,password});
    const {accessToken, ...userData}=responce.data;

    localStorage.setItem("accessToken",accessToken);

    return userData;
}

api.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken")

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

//user

export async function getUsers() {
    const responce =await api.get("/users");

    return responce.data;
}

export async function postUser(name:string,email:string,role:string){
    const password="1111";
    const responce = await api.post("/users",{name,email,password,role})
    return responce.data;
}

export async function deleteUser(id:string) {
    const responce = await api.delete(`/users/${id}`);

    return responce.data;
}