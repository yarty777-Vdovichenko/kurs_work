import { useState } from "react";

export default function useRefresh() {
    const [refresh, setRefresh] = useState(0);
    const triggerRefresh = () => setRefresh(prev => prev + 1);
    return { refresh, triggerRefresh };
}