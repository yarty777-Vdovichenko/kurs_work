import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseHome from '../../Layout/BaseHome';
import BaseAdmin from '../../Layout/BaseAdmin';
import Home from "../../Pages/Home/Home"
import Register from "../../Pages/Register/Register"
import Login from "../../Pages/Login/Login"
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Tarifs from '../../Pages/Tarifs/Tarifs';
import Users from '../../Pages/Users/Users';
import Abonents from '../../Pages/Abonents/Abonents';
import Charts from '../../Pages/Charts/Charts';
import ForbiddenPage from '../../Pages/ForbiddenPage/ForbiddenPage';
import PrivatRoute from '../../Components/PrivatRoute/PrivatRoute';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='forbiden' element={<ForbiddenPage/>}/>
        <Route path='/' element={<BaseHome/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
        <Route path='/srm' element={<BaseAdmin/>}>
          <Route path='dashboard' element={
            <PrivatRoute alloweddRoles={["User", "Admin", "Manager"]}>
              <Dashboard/>
            </PrivatRoute>}/>
          <Route path='users' element={
            <PrivatRoute alloweddRoles={["Admin", "Manager"]}>
              <Users/>
            </PrivatRoute>
          }/>
          <Route path='abonents' element={
            <PrivatRoute alloweddRoles={["User", "Admin", "Manager"]}>
              <Abonents/>
            </PrivatRoute>
          }/>
          <Route path='tarifs' element={
            <PrivatRoute alloweddRoles={["User", "Admin", "Manager"]}>
              <Tarifs/>
            </PrivatRoute>
          }/>
          <Route path='charts' element={
            <PrivatRoute alloweddRoles={["Manager"]}>
              <Charts/>
            </PrivatRoute>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}