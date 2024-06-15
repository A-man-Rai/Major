import React from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from "./components/Admin/Login/Login"
import Home from './components/Home/Home';
import Form from './components/LoginAndRegister/Login/Form';
import OtpPage from './components/LoginAndRegister/OtpPage/OtpPage';
import FindAccount from './components/LoginAndRegister/FindAccount/FindAccount';
import NewPassword from './components/LoginAndRegister/FindAccount/NewPassword';
import Dashboard from './components/UserDashboard/Dashboard';
import AccountAlreadyLinked from './components/LoginAndRegister/SignUp/AccountAlreadyLinked';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './NotFoundPage';
import { useSelector } from "react-redux";
import ProtectUserDashboard from "./components/protectUserDashboard"
import ProtectAdminDashboard from "./components/ProtectAdminDashboard"
function App() {

  const linked = useSelector(state=>state.auth.isLinked);
  const otp = useSelector(state=>state.auth.otp);
  const password = useSelector(state=>state.auth.newpassword);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Form />
    },
    {
      path: '/otp',
      element:<ProtectedRoute auth={otp}><OtpPage/></ProtectedRoute>
    },
    {
      path: '/find',
      element: <FindAccount />
    },
    {
      path: '/newpassword',
      element: <ProtectedRoute auth={password}><NewPassword /></ProtectedRoute>
    },
    {
      path: '/login/dashboard',
      element:<ProtectUserDashboard><Dashboard/></ProtectUserDashboard>
    },
    {
      path: '/linked',
      element:<ProtectedRoute auth={linked}><AccountAlreadyLinked /></ProtectedRoute> 
    },
    {
      path: '/admin',
      element: <Login/>
    },
    {
      path: '/admin/dashboard',
      element:<ProtectAdminDashboard> <AdminDashboard/></ProtectAdminDashboard>
    },
    {
     path:"*",
     element:<NotFoundPage/>
    }
  ]);

  return (
    
    <RouterProvider router={router}/>
    
  );
}

export default App;
