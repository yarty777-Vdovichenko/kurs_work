import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseHome from '../../Layout/BaseHome';
import BaseAdmin from '../../Layout/BaseAdmin';
import Home from "../../Pages/Home/Home"
import Register from "../../Pages/Register/Register"
import Login from "../../Pages/Login/Login"
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Tarifs from '../../Pages/Tarifs/Tarifs';
import Users from '../../Pages/Users/Users';
import Charts from '../../Pages/Charts/Charts';
import Abonents from '../../Pages/Abonents/Abonents';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BaseHome/>}>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
        <Route path='/srm' element={<BaseAdmin/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='users' element={<Users/>}/>
          <Route path='abonents' element={<Abonents/>}/>
          <Route path='tarifs' element={<Tarifs/>}/>
          <Route path='charts' element={<Charts/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}