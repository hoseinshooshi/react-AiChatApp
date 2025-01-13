import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from './Routes/Dashboard/Dashboard.jsx'
import HomePage from './Routes/HomePage/HomePage.jsx'
import SignupPage from './Routes/SignUp/SignupPage.jsx';
import Signin from './Routes/SignIn/Singin.jsx'
import SingleChatpage from './Routes/SingleChatPage/SingleChatpage.jsx'
import RootLayouts from './layouts/rootLayouts/RootLayouts.jsx';
import DashboardLayouts from './layouts/dashboardLayouts/DashboardLayouts.jsx';
const router = createBrowserRouter([
  {
   element: <RootLayouts />, 
   children: [
    {
      path: "/", 
      element: <HomePage />
    } , 
    {
      path: "/sign-in/*", 
      element: <Signin />
    } , 
    {
      path: "/sign-up/*", 
      element: <SignupPage />
    } , 
    {
      element: <DashboardLayouts />,
      children: [
        {
          path:"/dashboard/chats/:id", 
          element: <SingleChatpage />
        }, 
        {
          path: "/dashboard", 
          element: <Dashboard />
        }
      ]
    }
   ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
