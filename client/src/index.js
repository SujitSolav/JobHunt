import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {  RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App';
import Home from './Componants/Home';
import Login from './Componants/Login';
import Register from './Componants/Register';
import Navbar from './Componants/Navbar';
import Footer from './Componants/Footer';
import About from './Componants/About';
import JobHome from './Componants/JobHome';
import Admin from './Componants/Admin';
import AdminLogin from './Componants/AdminLogin';

const router= createBrowserRouter([
  {
    path:'',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/register',
        element:<Register/>
      },
      {
        path:'/navbar',
        element:<Navbar/>
      },
      {
        path:'/footer',
        element:<Footer/>
      },
      {
        path:'/about',
        element:<About/>
      },
      {
        path:'/jobhome',
        element:<JobHome/>
      },
      {
        path:'/admin',
        element:<Admin/>
      }
      ,
      {
        path:'/adminLogin',
        element:<AdminLogin/>
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
