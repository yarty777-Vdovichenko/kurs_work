import { useState } from "react";

interface UseModalFormOptions {
    hasChanges: () => boolean;
    onSave: () => Promise<void>;
    setOpen: (open: boolean) => void;
    onSuccess?: () => void;
    noChangesMessage?: string;
}

function useModalForm(options: UseModalFormOptions) {
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        if (!options.hasChanges()) {
            alert(options.noChangesMessage ?? "Ви нічого не змінили!");
            return;
        }

        try {
            setLoading(true);
            await options.onSave();
            options.onSuccess?.();
            options.setOpen(false);
        }
        catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }
    };

    return { handleSave, loading };
}

export default useModalForm;