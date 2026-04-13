import {IconButton,TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import UserDrawer from "../../Components/UserDrawer/UserDrawer.tsx";
import styles from "./Users.module.css";
import { deleteUser, getUsers } from "../../api/api.ts";
import { Clear, Delete, Edit, FilterAlt, Refresh } from "@mui/icons-material";
import ModalUser from "../../Components/ModalUser/ModalUser.tsx";
import {type Role, type User} from "../../types/types.ts"

const selected={backgroundColor:"#52b57d"}



export default function Users()
{
    const [open,setOpen]=useState<boolean>(false);
    const [selectedUsers,setSelectedUsers]=useState<string[]>([])
    const [users,setUsers]=useState<User[]>([])
    const [filterUsers,setFilterUsers]=useState<User[]>([])
    const [openFilter,setOpenFilter]=useState<boolean>(false);
    const [filterRole,setFilterRole]=useState<string>("All");
    const [filterSort,setFilterSort]=useState<string>("None");
    const [search,setSearch]=useState<string>("");
    const [modalOpen,setModalOpen]=useState<boolean>(false);
    const [currentRole,setCurrentRole]=useState<Role>("");
    const [id,setId]=useState<string>("");

    useEffect(()=>{
        let result = filterRole === "All" ? [...users] : users.filter(user => user.role === filterRole);

        if (filterSort !== "None") {
            if(filterSort==="Name"){
                result.sort((a,b)=>a.name.localeCompare(b.name));
            }else
            {
                result.sort((a,b)=>a.email.localeCompare(b.email));
            }
        }

        setFilterUsers(result);
    },[filterRole,users,filterSort])

    async function loadUser(){
        try{
            const responce = await getUsers();

            setUsers(responce);
        }catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        loadUser();
    },[modalOpen])

    function changeSelect(id:string){
        setSelectedUsers(prev=> prev.includes(id) ? prev.filter(u=>u!==id) : [...prev,id])
    }

    async function deleteSelected(){
        const isConfirmed = window.confirm("Ви впевнені, що хочете видалити вибраних користувачів? Ви розумієте що вони втратять доступ до данного застосунку?");
    
        if (!isConfirmed) return;

        try{
            await Promise.all(selectedUsers.map(id=>deleteUser(id)))
            setUsers(prev => prev.filter(user=> !selectedUsers.includes(user.id)))
            setSelectedUsers([]);
        }
        catch(error:any){
            console.log(error);
            alert(error)
        }
    }

    function searchUser(){
        if(!search)
            return;
        const newUsers = filterUsers.filter(user=>user.name.includes(search)||user.email.includes(search))

        setFilterUsers(newUsers);
    }

    return(
        <div className={styles.mainUser}>
            <div className={styles.search} id="search">
                <TextField value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="Пошук за ім'ям/ел. поштою..." sx={{backgroundColor:"white", borderColor:"#9ACFB1",flex:1,borderRadius:1}}></TextField>
                <IconButton onClick={searchUser}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" 
                    d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 
                    5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 
                    9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
                 </IconButton>
                 <IconButton onClick={()=>{setSearch("");setFilterUsers(users);}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" 
                    d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 
                    8.4l3.6 3.6L7 15.6zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 
                    12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 
                    12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 
                    12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>
                 </IconButton>
                    <IconButton onClick={()=>{!openFilter?setOpenFilter(true):setOpenFilter(false);setFilterSort("None");setFilterRole("All");}}><FilterAlt sx={{fontSize:"28px",color:"white"}}/></IconButton>
                 
            </div>
            {openFilter &&
            <div className={styles.filterMenu}>
                <p>Role</p>
                <div className={styles.choose}>
                    <div className={`${styles.variant} ${filterRole === "All" ? styles.selected : ""}`} 
                    onClick={() => setFilterRole("All")}>All</div>
                    <div className={`${styles.variant} ${filterRole === "Meneger" ? styles.selected : ""}`}  
                    onClick={() => setFilterRole("Meneger")}>Meneger</div>
                    <div className={`${styles.variant} ${filterRole === "Admin" ? styles.selected : ""}`} 
                    onClick={() => setFilterRole("Admin")}>Admin</div>
                    <div className={`${styles.variant} ${filterRole === "User" ? styles.selected : ""}`} 
                    onClick={() => setFilterRole("User")}>User</div>
                </div>
                <p>Сортування</p>
                <div className={styles.choose}>
                    <div className={`${styles.variant} ${filterSort === "None" ? styles.selected : ""}`}  
                    onClick={()=>setFilterSort("None")}>
                        Без сортування
                    </div>
                    <div className={`${styles.variant} ${filterSort === "Name" ? styles.selected : ""}`}  
                    onClick={()=>setFilterSort("Name")}>
                        За ім'ям
                    </div>
                    <div className={`${styles.variant} ${filterSort === "Email" ? styles.selected : ""}`}  
                    onClick={()=>setFilterSort("Email")}>
                        За ел. поштою
                    </div>
                </div>
            </div>
            }
            {selectedUsers.length === 0 && 
            <div className={styles.simple}>
                <p><i>Центр управління користувачами: всі, хто підключений до нашого сервісу, в одному місці</i></p>
            </div>}
            {selectedUsers.length > 0 && 
            <div className={styles.menu}>
                <p>Вибрано користувачів: {selectedUsers.length}</p>
                <div>
                    <IconButton onClick={()=>deleteSelected()}><Delete sx={{fontSize:"32px",color:"white"}}/></IconButton>
                    
                    <IconButton onClick={()=>setSelectedUsers([])}><Clear sx={{fontSize:"32px",color:"white"}}/></IconButton>
                </div>
            </div>
            }
            <div className={styles.cardsUser}>
                {filterUsers.map(user=>{
                    return(
                        <div key={user.id} className={`${styles.cardUser} ${selectedUsers.includes(user.id) ? styles.selected : ""}`} onClick={()=>{changeSelect(user.id);setOpen(false)}}>
                            <div className={styles.dataUser}>
                                <span>ID: {user.id}</span>
                                <span className={styles.roleUser}>Role: {user.role}</span>
                                <span>Name: {user.name}</span> 
                                <span>Email: {user.email}</span>
                            </div>
                            <div className={styles.selectionUser} style={selectedUsers.includes(user.id)?selected:{}}>
                                <IconButton sx={{display:"flex",justifyContent:"center",height:"100%"}} 
                                onClick={
                                    (e) => {e.stopPropagation();
                                    setId(user.id);
                                    setCurrentRole(user.role);
                                    setModalOpen(true);
                                }
                                }>
                                    <Edit sx={{color:"white",}}/>
                                </IconButton>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className={`${styles.iconsUsers} ${open ? styles.open : ""}`}>
                <IconButton
                onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                sx={{
                    backgroundColor:"#ec813f",
                    color:"white",
                    transition:"0.3s",

                    "&:hover":{backgroundColor:"#26382e",color:"white"}
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" 
                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 6l4-4l4 4m-4-4v20"/></svg>
                </IconButton>
                <IconButton 
                onClick={()=>setOpen(true)}
                sx={{
                    backgroundColor:"#ec813f",
                    color:"white",
                    transition:"0.3s",

                    "&:hover":{backgroundColor:"#26382e",color:"white"}
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" 
                    d="M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2"/></svg>
                </IconButton>
                <IconButton 
                onClick={()=>loadUser()}
                sx={{
                    backgroundColor:"#ec813f",
                    color:"white",
                    transition:"0.3s",

                    "&:hover":{backgroundColor:"#26382e",color:"white"}
                }}><Refresh/>
                </IconButton>
            </div>
            {open&&(
            <div className= {styles.drawer}>
                <UserDrawer setOpen={setOpen}/>
            </div>
            )}
            {modalOpen &&
                <ModalUser role={currentRole} id={id} setOpen={setModalOpen}>
                    
                </ModalUser>
            }
        </div>
    )
}