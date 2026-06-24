import { Navigate } from "react-router-dom";
import { useRole } from "../../hooks/useRole";
import { store } from "../../store/store";

export default function PrivatRoute({children,alloweddRoles}:{children:React.ReactNode,alloweddRoles:string[]}) {
    const token = store.getState().auth.accessToken;
    const role = useRole();

    if(!token){
        return <Navigate to="/" />;
    }

    if(!alloweddRoles.includes(role ?? "")){
        return <Navigate to="/forbiden" />;
    }

    return <>{children}</>
}