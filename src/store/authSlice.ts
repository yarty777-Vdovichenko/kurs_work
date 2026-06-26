import { createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { Role } from "../types/types";

interface AuthState {
    accessToken?: string|null,
    role?: Role|null,
    error?: string|null
}

const initialState:AuthState ={
    accessToken:null,
    role:null,
    error:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        loginStart: (state) =>{
            state.error = null;
        },
        loginSuccess: (state, action:PayloadAction<{accessToken:string,role:Role}>) =>{
            state.accessToken = action.payload.accessToken;
            state.role = action.payload.role;
        },
        loginFailed: (state, action:PayloadAction<string>) =>{
            state.error = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearAuth: (state) => {
            state.accessToken = null;
            state.role = null;
        },
    }
})

export const { loginStart, loginSuccess, loginFailed, setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;