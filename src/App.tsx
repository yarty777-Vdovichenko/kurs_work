import React from 'react';
import './App.css';
import {BrowserRouter,Link,Route,Routes} from 'react-router-dom'
import Home from "./Pages/Home"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import BaseHome from './Layout/BaseHome';
import BaseAdmin from './Layout/BaseAdmin';
import Dashboard from './Pages/Dashboard';
import Tarifs from './Pages/Tarifs';
import Users from './Pages/Users';
import Charts from './Pages/Charts';
import Abonents from './Pages/Abonents';

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/srm/dashboard">Dashboard</Link>
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
    </>
  );
}

export default App;
