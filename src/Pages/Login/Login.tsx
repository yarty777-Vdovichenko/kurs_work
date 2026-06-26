import { Box } from "@mui/material";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { AuthButton, AuthTextField } from "../../Components/styled/AuthComponents";
import { PasswordField } from "../../Components/Auth/PasswordField";
import { ErrorMessage } from "../../Components/Auth/ErrorMessage";
import { AuthBackground } from "../../Components/Layout/AuthBackground";
import { LoginSvg } from "../../Components/Layout/LoginSvg";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);

    const { userLogin, loading, error } = useLogin();

    return (
        <>
            <AuthBackground />
            <LoginSvg />
            <Box sx={{
                backgroundColor: "#010101",
                minHeight: "100vh",
                width: "30%",
                paddingTop: "200px",
                display: "flex",
                gap: 10,
                flexDirection: "column",
                "@media (max-width: 1200px)": { width: "50%", paddingTop: "150px" },
                "@media (max-width: 900px)": { width: "70%", paddingTop: "120px" },
                "@media (max-width: 600px)": { width: "100%", paddingTop: "100px" }
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    gap: 10,
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <AuthTextField
                        variant="filled" label="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <PasswordField
                        value={password}
                        onChange={setPassword}
                        showPassword={showPassword}
                        onToggle={() => setShowPassword(!showPassword)}
                    />
                    <Box sx={{
                        width: "80%",
                        display: "flex",
                        gap: 6,
                        flexDirection: "column",
                        marginTop: 12
                    }}>
                        <AuthButton
                            variant="contained"
                            onClick={() => userLogin(email, password)}
                        >
                            {!loading ? "Увійти" : "Завантаження..."}
                        </AuthButton>
                        <ErrorMessage message={error} />
                    </Box>
                </Box>
            </Box>
        </>
    );
}