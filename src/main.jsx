import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './Component/Login/Login.jsx'
import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Signup from './Component/Signup/Signup.jsx'
import Forgotpassword from './Component/Forgotpassword/Forgotpassword.jsx'
import Resetpassword from './Component/Resetpassword/Resetpassword.jsx'
import Userlist from './Component/Userlist/Userlist.jsx'
import Profileupdate from './Component/Profileupdate/Profileupdate.jsx'
import { Provider } from 'react-redux'
import Store from './Component/STORE/Store.js'

 

const router =  createBrowserRouter ([
   {
     path: '/',
     element: <Login />,
   }
   ,
     {
        path: 'signup' ,
        element: <Signup />,
       },
       {
        path: 'login' ,
        element: <Login />,
       },
        {
        path: 'reset/:id',
        element : <Resetpassword />,
       }, 
       {
        path: 'forgotpassword',
        element : <Forgotpassword />
       },
       {
        path: 'userdata',
        element : <Userlist />,
       },
       
       {
        path: 'profileupdate',
        element : <Profileupdate />,
       },
       
   ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store} >
    <RouterProvider router = {router} />
  </Provider>,
)






