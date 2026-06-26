import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginStart, loginSuccess, loginFailed } from "../store/authSlice";
import { login } from "../api/auth.api";

function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const userLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError("");
            dispatch(loginStart());

            const { accessToken, role } = await login(email, password);
            dispatch(loginSuccess({ accessToken, role }));

            navigate("/srm/dashboard");
        }
        catch (Eror: any) {
            console.log("Error API:", Eror);
            setError(Eror);
            dispatch(loginFailed(Eror));
        }
        finally {
            setLoading(false);
        }
    };

    return { userLogin, loading, error };
}

export default useLogin;