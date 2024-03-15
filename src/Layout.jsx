import React from 'react'
import { Outlet } from 'react-router-dom'
import Login from './Component/Login/Login'

//layout as base use karlega header footerr same rahega uske andar cheeje change hogi 

function Layout() {
  return (
    <>
    <Login />
    <Outlet />
    </>
  )
}

export default Layout