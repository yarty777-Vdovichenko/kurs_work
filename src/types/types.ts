export type Tarif={
    id:string,
    name:string,
    internet_capacity:number,
    minutes:number,
    additional:string,
    price:number
}
export type User={
    id:string;
    name:string;
    email:string;
    role:Role;
}
export type Role = "Meneger"|"Admin"|"User"|"";
export type ModalUserProps = {
    role: Role;
    id: string;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export type ModalTarifProps = {
    tarif?:Tarif;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}