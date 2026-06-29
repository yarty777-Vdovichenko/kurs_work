import { type ReactNode } from "react";

export function FilterPanel({ children }: { children: ReactNode }) {
    return (
        <div className="tarifs-filter-menu">
            {children}
        </div>
    );
}