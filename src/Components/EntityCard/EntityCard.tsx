import { type ReactNode } from "react";

interface EntityCardProps {
    selected: boolean;
    onClick?: () => void;
    cursor?: string;
    children: ReactNode;
    actions?: ReactNode;
    selectionStyle?: object;
}

export function EntityCard({ selected, onClick, cursor, children, actions, selectionStyle }: EntityCardProps) {
    return (
        <div
            className={`tarifs-card ${selected ? "selected" : ""}`}
            style={cursor ? { cursor } : undefined}
            onClick={onClick}
        >
            <div className="tarifs-data">
                {children}
            </div>
            <div className="tarifs-selection" style={selectionStyle}>
                {actions}
            </div>
        </div>
    );
}