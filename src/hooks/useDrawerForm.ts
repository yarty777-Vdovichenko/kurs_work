import { useState } from "react";

interface UseDrawerFormOptions {
    validate?: () => string | null;
    onSave: () => Promise<void>;
    onSuccess?: () => void;
    successMessage?: string;
}

function useDrawerForm(options: UseDrawerFormOptions) {
    const [error, setError] = useState<string>("");
    const [created, setCreated] = useState<string>("");

    const handleSave = async () => {
        setError("");
        setCreated("");

        if (options.validate) {
            const validationError = options.validate();
            if (validationError) {
                setError(validationError);
                return;
            }
        }

        try {
            await options.onSave();
            setCreated(options.successMessage ?? "Created");
            options.onSuccess?.();
        }
        catch (error: any) {
            setError(error.message ?? error);
        }
    };

    const resetMessages = () => {
        setError("");
        setCreated("");
    };

    return { handleSave, error, created, resetMessages };
}

export default useDrawerForm;