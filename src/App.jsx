import React from 'react';
import { createBrowserRouter, RouterProvider,Route,Routes } from 'react-router-dom';
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
      element:<OtpPage/>
    },
    {
      path: '/find',
      element: <FindAccount />
    },
    {
      path: '/newpassword',
      element: <NewPassword />
    },
    {
      path: '/login/dashboard',
      element:<Dashboard/>
    },
    {
      path: '/linked',
      element: <AccountAlreadyLinked />
    },
    {
      path: '/submitted',
      element: <ApplicationSubmitted />
    },
    {
      path: '/admin',
      element: <Login/>
    },
    {
      path: '/admin/dashboard',
      element: <AdminDashboard/>
    }
  ]);

  return (
    
    <RouterProvider router={router}/>
    
  );
}

export default App;
