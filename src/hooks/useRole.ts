import { useNavigate } from "react-router-dom";

export function useRole(): string | null {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();

    if (!role) navigate("/");

    return role;
}