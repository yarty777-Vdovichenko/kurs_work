export type Tarif={
    id:string,
    name:string,
    internet_capacity:number,
    minutes:number,
    additional:string,
    price:number
}
export type User={
    id:string,
    name:string,
    email:string,
    role:Role
}
export type Sub = {
    id: string;
    fullName: string;
    createdAt: string;
    sims: Sim[];
}
export type Sim = {
    id: string;
    simNumber: string;
    status: "active" | "blocked";
    createdAt: string;
    tarifId: string;
}
export type Role = "Meneger"|"Admin"|"User"|"";
export type PagedResult<T> = {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
export type ModalUserProps = {
    role: Role;
    id: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type ModalTarifProps = {
    tarif?:Tarif;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}