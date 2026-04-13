export type Tarif={
    id:string,
    name:string,
    internet_capacity:number,
    Minutes:number,
    Additional:string,
    Price:number
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