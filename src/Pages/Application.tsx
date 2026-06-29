import { useEffect, useState } from "react"
import { approveApplications, getApplications, rejectApplications } from "../api/application.api";
import "../styles/general.css"
import type { Request } from "../types/types";
import { Button, CircularProgress } from "@mui/material";
import useSnackbar from "../hooks/useSnackbar";

type Loading = {
    type : "approve" | "refuse" | null,
    id: string | null
}

export default function Application() {
    const { showSnackbar } = useSnackbar();

    const [apps, setApps] = useState<Request[]>([]);
    const [info, setInfo] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);
    const [loading, setLoading] = useState<Loading>({type:null,id:null});

    useEffect(() => {
        loadApps();
    }, []);

    async function loadApps() {
        try {
            setIsLoading(true);
            const responce = await getApplications();
            setApps(responce);
        }
        catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            setInfo(message);
            setApps([]);
        }
        finally {
            setIsLoading(false);
        }
    }

    async function approve(id: string) {
        try {
            setLoading({type:"approve",id});
            const responce = await approveApplications(id);
            setInfo(responce);
            await loadApps();
            showSnackbar("Заявку прийнято", "success");
        }
        catch (err: any) {
            setInfo(err);
        }
        finally {
            setLoading({type:null,id:null});
        }
    }

    async function refuse(id: string) {
        try {
            setLoading({type:"refuse",id});
            const responce = await rejectApplications(id);
            setInfo(responce);
            await loadApps();
            showSnackbar("Заявку відхилено", "info");
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading({type:null,id:null});
        }
    }

    if (isLoading) {
        return (
            <div className="main_app" style={{ display: "flex", justifyContent: "center", paddingTop: "100px" }}>
                <CircularProgress />
            </div>
        );
    }

    return (
        <div className="main_app">
            <div className="title">
                {info}
            </div>
            <div className="cardsField">
                {apps?.map(ap => {
                    const isThisProcessing = loading.id === ap.id;
                    return (
                        <div key={ap.id} className="cardAppli">
                            <span>{ap.id}</span>
                            <span>{ap.name}</span>
                            <span>{ap.email}</span>
                            <span>{ap.status}</span>
                            <span>
                                Дата створення:{" "}
                                {new Date(ap.createdAt).toLocaleDateString("uk-UA", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </span>
                            <div className="buttons">
                                <Button
                                    sx={{
                                        width: "100%", backgroundColor: "#32ac67", color: "white", "&:hover": { backgroundColor: "#6ce19f" },
                                        "@media (max-width: 700px)": { width: "100px" }
                                    }}
                                    disabled={isThisProcessing}
                                    onClick={() => { approve(ap.id) }}
                                >
                                    {(isThisProcessing && loading.type === "approve") ? <CircularProgress size={20} color="inherit" /> : "Прийняти"}
                                </Button>
                                <Button
                                    sx={{
                                        width: "100%", backgroundColor: "#ec813f", color: "white", "&:hover": { backgroundColor: "#ff9f63" },
                                        "@media (max-width: 700px)": { width: "100px" }
                                    }}
                                    disabled={isThisProcessing}
                                    onClick={() => { refuse(ap.id) }}
                                >
                                    {(isThisProcessing && loading.type === "refuse") ? <CircularProgress size={20} color="inherit" /> : "Відхилити"}
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}