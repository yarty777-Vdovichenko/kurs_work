import { useState } from "react";
import { register } from "../api/auth.api";
import useSnackbar from "./useSnackbar";

function useRegisterRequest() {
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");

    const submitRequest = async (name: string, email: string, password: string) => {
        setError("");

        const normalizedEmail = email.toLowerCase();

        if (!normalizedEmail.includes("@") || !normalizedEmail.includes(".")) {
            setError("Wrong email format");
            return false;
        }
        if (name.length < 4) {
            setError("Коротке ім'я");
            return false;
        }
        if (password.length < 6) {
            setError("Короткий пароль");
            return false;
        }

        try {
            setLoading(true);
            await register(name, "User", normalizedEmail, password)
            showSnackbar("Заяку відправлено, очікуйте відтвердження на електронну пошту!","success");
            return true;
        }
        catch (error: any) {
            console.log("Error: ", error);
            setError(error);
            return false;
        }
        finally {
            setLoading(false);
        }
    };

    return { submitRequest, loading, error };
}

export default useRegisterRequest;