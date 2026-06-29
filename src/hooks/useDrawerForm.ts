import { useState } from "react";
import useSnackbar from "./useSnackbar";

interface UseDrawerFormOptions {
    validate?: () => string | null;
    onSave: () => Promise<void>;
    onSuccess?: () => void;
    successMessage?: string;
}

function useDrawerForm(options: UseDrawerFormOptions) {
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (options.validate) {
            const validationError = options.validate();
            if (validationError) {
                showSnackbar(validationError, "warning");
                return;
            }
        }

        try {
            setLoading(true);
            await options.onSave();
            showSnackbar(options.successMessage ?? "Created", "success");
            options.onSuccess?.();
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            showSnackbar(message, "error");
        }
        finally {
            setLoading(false);
        }
    };

    return { handleSave, loading };
}

export default useDrawerForm;