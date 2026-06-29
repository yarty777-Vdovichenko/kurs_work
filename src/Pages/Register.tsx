import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";
import useRegisterRequest from "../hooks/useRegisterRequest";
import { AuthButton, AuthTextField } from "../Components/styled/AuthComponents";
import { AuthBackground } from "../Components/Layout/AuthBackground";
import RegisterSvg from "../Components/Layout/RegisterSvg";
import { PasswordField } from "../Components/Auth/PasswordField";
import { ErrorMessage } from "../Components/Auth/ErrorMessage";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const { submitRequest, loading, error } = useRegisterRequest();

    return (
        <>
            <AuthBackground/>
            <Box sx={{
                backgroundColor: "#010101",
                minHeight: "100vh",
                width: "30%",
                paddingTop: "50px",
                display: "flex",
                gap: 4,
                flexDirection: "column",
                "@media (max-width: 1200px)": { width: "50%", paddingTop: "50px" },
                "@media (max-width: 900px)": { width: "70%", paddingTop: "30px" },
                "@media (max-width: 600px)": { width: "100%", paddingTop: "20px" }
            }}>
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    gap: 4,
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <RegisterSvg/>
                    <AuthTextField
                        variant="filled" label="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                        gap: 2,
                        flexDirection: "column",
                        mt: 2
                    }}>
                        <AuthButton variant="contained" onClick={() => submitRequest(name, email, password)}>
                            {   loading ? <CircularProgress size={20} color="inherit" /> : "Надіслати заявку"}
                        </AuthButton>
                        <ErrorMessage message={error}/>
                    </Box>
                </Box>
            </Box>
        </>
    );
}