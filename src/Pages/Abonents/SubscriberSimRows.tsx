import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import type { Sim, Tarif, FilterStatus } from "../../types/types";
import styles from "./Abonents.module.css";

interface SubscriberSimRowsProps {
    sims: Sim[];
    tarifs: Tarif[];
    filterSim: FilterStatus;
    filterTarif: string;
    onEditSim: (simId: string) => void;
    onDeleteSim: (simId: string) => void;
    formatDate: (date: string | Date) => string;
}

export function SubscriberSimRows({
    sims,
    tarifs,
    filterSim,
    filterTarif,
    onEditSim,
    onDeleteSim,
    formatDate
}: SubscriberSimRowsProps) {
    return (
        <div className={styles.simsTableWrapper}>
            <table className={styles.simsTable}>
                <thead>
                    <tr>
                        <th>ID SIM</th>
                        <th>Номер</th>
                        <th>Статус</th>
                        <th>Тариф</th>
                        <th>Дата створення</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {sims
                        .filter(sim => {
                            const matchStatus = filterSim === "" || sim.status === filterSim;
                            const matchTarif = filterTarif === "" || sim.tarifId === filterTarif;
                            return matchStatus && matchTarif;
                        })
                        .map(sim => (
                            <tr key={sim.id} className={styles.simRow}>
                                <td className={styles.idCell}>{sim.id}</td>
                                <td>{sim.simNumber.startsWith("+") ? sim.simNumber : `+${sim.simNumber}`}</td>
                                <td>
                                    <span className={`${styles.statusBadge} ${styles[sim.status]}`}>
                                        {sim.status}
                                    </span>
                                </td>
                                <td>{tarifs.find(t => t.id === sim.tarifId)?.name ?? "—"}</td>
                                <td>{formatDate(sim.createdAt)}</td>
                                <td>
                                    <IconButton size="small" onClick={() => onEditSim(sim.id)}>
                                        <Edit sx={{ color: "white" }} />
                                    </IconButton>
                                    <IconButton size="small" onClick={() => onDeleteSim(sim.id)}>
                                        <Delete sx={{ color: "white" }} />
                                    </IconButton>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}