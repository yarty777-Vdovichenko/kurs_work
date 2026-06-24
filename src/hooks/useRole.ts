import { useNavigate } from "react-router-dom";
import { store } from "../store/store";

export function useRole(): string | null {
    const role = store.getState().auth.role;
    const navigate = useNavigate();

    if (!role) navigate("/");

    return role!;
}