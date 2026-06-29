import { useState } from "react";
import useSnackbar from "./useSnackbar";

interface UseModalFormOptions {
    hasChanges: () => boolean;
    onSave: () => Promise<void>;
    setOpen: (open: boolean) => void;
    onSuccess?: () => void;
    noChangesMessage?: string;
}

function useModalForm(options: UseModalFormOptions) {
    const [loading, setLoading] = useState(false);
    const { showSnackbar } = useSnackbar();

    const handleSave = async () => {
        if (!options.hasChanges()) {
            showSnackbar(options.noChangesMessage ?? "Ви нічого не змінили!","warning");
            return;
        }

        try {
            setLoading(true);
            await options.onSave();
            showSnackbar("Збережено!", "success");
            options.onSuccess?.();
            options.setOpen(false);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            showSnackbar(message,"error");
        }
        finally {
            setLoading(false);
        }
    };

    return { handleSave, loading };
}

export default useModalForm;