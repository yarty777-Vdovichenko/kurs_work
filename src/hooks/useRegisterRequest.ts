import { useState } from "react";
import { register } from "../api/auth.api";

function useRegisterRequest() {
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
            const response = await register(name, "User", normalizedEmail, password);
            setError(response);
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