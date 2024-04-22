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
import ApplicationSubmitted from './components/RapForm/ApplicationSubmitted';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectIsLinked from "./components/ProtectIsLinked"
import ProtectOtp from "./components/ProtectOtp"
import ProtectPassword from "./components/ProtectPassword"
import ProtectAdmin from "./components/ProtectAdmin"
function App() {
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
      element:<ProtectOtp><OtpPage/></ProtectOtp>
    },
    {
      path: '/find',
      element: <FindAccount />
    },
    {
      path: '/newpassword',
      element: <ProtectPassword><NewPassword /></ProtectPassword>
    },
    {
      path: '/login/dashboard',
      element:<ProtectedRoute><Dashboard/></ProtectedRoute>
    },
    {
      path: '/linked',
      element:<ProtectIsLinked><AccountAlreadyLinked /></ProtectIsLinked> 
    },
    {
      path: '/admin',
      element: <Login/>
    },
    {
      path: '/admin/dashboard',
      element:<ProtectAdmin> <AdminDashboard/></ProtectAdmin>
    }
  ]);

  return (
    
    <RouterProvider router={router}/>
    
  );
}

export default App;
