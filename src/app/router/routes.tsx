import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';
import PrivatRoute from '../../Components/PrivatRoute/PrivatRoute';

const BaseHome = lazy(() => import('../../Layout_Pages/BaseHome'));
const BaseAdmin = lazy(() => import('../../Layout_Pages/BaseAdmin'));
const Home = lazy(() => import('../../Pages/Home'));
const Register = lazy(() => import('../../Pages/Register'));
const Login = lazy(() => import('../../Pages/Login'));
const Dashboard = lazy(() => import('../../Pages/Dashboard'));
const Tarifs = lazy(() => import('../../Pages/Tarifs'));
const Users = lazy(() => import('../../Pages/Users'));
const Abonents = lazy(() => import('../../Pages/Abonents/Abonents'));
const ForbiddenPage = lazy(() => import('../../Pages/ForbiddenPage'));
const Application = lazy(() => import('../../Pages/Application'));

function PageLoader() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
        </Box>
    );
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
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
            <Route path='applications' element={
              <PrivatRoute alloweddRoles={["Admin","Manager"]}>
                <Application/>
              </PrivatRoute>
            }/>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}