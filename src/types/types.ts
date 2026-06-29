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
    status: Status;
    createdAt: string;
    tarifId: string;
}
export type CreateSimPayload = {
    status: Status;
    tarifId: string;
};

export type CreateSubPayload = {
    fullName: string;
    sims?: CreateSimPayload[];
};
export type Status = "active" | "blocked"; 
export type Role = "Manager"|"Admin"|"User"|"";
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
export type ModalSubProps = {
    sub: Sub,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
export type ModalAddSimProps = {
    subId:string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
export type ModalEditSimProps = {
    subId:string,
    simId:string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
export type FilterStatus = Status | "";
export type Stats = {
    totalSubscribers: number;
    activeSims: number;
    blockedSims: number;
    newSubscribersLast7Days: number;
    totalTarifs: number;
    simsByTarif:SimsByTarif[];
    subscribersByDay:SubscribersByDay[];
}
export type SimsByTarif ={
    tarifName:string,
    count:number
}
export type SubscribersByDay ={
    date:string,
    count:number
}
export type Request ={
    id:string,
    name:string,
    email:string,
    status:string,
    createdAt:string
}
export type ModalDelteTarif = {
    id:string,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>
    onSuccess?: () => void
}
export type Type = "success" | "info" | "error" | "warning"