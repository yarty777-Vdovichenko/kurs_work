import { api } from "./api";

export async function register(name:string,role:string,email:string,password:string)
{
    try{
    const responce = await api.post("/auth/register",{name,role,email,password});

    return responce.data.message;
    }
    catch(error:any){
        if (error.message){
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}

export async function login(email:string,password:string) {
    try{
        const responce = await api.post("/auth/login",{email,password});
        const {accessToken,refreshToken,role, ...userData}=responce.data;

        localStorage.setItem("accessToken",accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("role",role);

        return userData;
    }
    catch(error:any){
        if (error.response) {
            throw error.response.data.message;
        } else {
            throw "Server error";
        }
    }
}

export async function refreshToken() {
    const res = await api.post("/auth/refresh");
    return res.data.accessToken;
}