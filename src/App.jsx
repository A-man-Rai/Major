
import Home from "./components/Home/Home"
import Form from "./components/LoginAndRegister/Login/Form";
import OtpPage from "./components/LoginAndRegister/OtpPage/OtpPage";
import FindAccount from "./components/LoginAndRegister/FindAccount/FindAccount";
import NewPassword from "./components/LoginAndRegister/FindAccount/NewPassword";
import Dashboard from "./components/UserDashboard/Dashboard";
import AccountAlreadyLinked from "./components/LoginAndRegister/SignUp/AccountAlreadyLinked";
import ApplicationForm from "./components/RapForm/ApplicationFrom";
import DocumentUploads from "./components/RapForm/DocumentUploads";
import ApplicationSubmitted from "./components/RapForm/ApplicationSubmitted";
import ApplicationFilled from "./components/UserDashboard/AlreadyFilled";
import {

  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path:"/login",
      element:<Form></Form> 
    },
    {
      path:"/otp",
      element:<OtpPage></OtpPage> 
    },
    {
      path:"/find",
      element:<FindAccount></FindAccount> 
    },
    {
      path:"/newpassword",
      element:<NewPassword></NewPassword> 
    },
  {
    path:"/login/dashboard",
    element:<Dashboard></Dashboard>
   },
   {
    path:"/linked",
    element:<AccountAlreadyLinked></AccountAlreadyLinked>
  },
  {
    path:"/rap",
    element:<ApplicationForm></ApplicationForm>
  },
  {
    path:"/rap/doc",
    element:<DocumentUploads></DocumentUploads>
  },
  {
   path:"/submitted",
   element:<ApplicationSubmitted></ApplicationSubmitted>
  },
  {
    path:"/found",
    element:<ApplicationFilled></ApplicationFilled>
   }

  ]);

  return (
    <>
    <RouterProvider router={router}  />
    </>
  )
}

export default App
