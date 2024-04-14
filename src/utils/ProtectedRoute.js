import React from 'react'
import { UseSelector, useSelector } from 'react-redux'
import { Navigate,useLocation } from 'react-router-dom'

function ProtectedRoute({children}) {
    const user = useSelector((state) => state.user)
    let location = useLocation()
    const isAuthenticated = useSelector((state) => state.isAuthenticated)
    // console.log(isAuthenticated)
    // if (!user.state.isAuthenticated) {
    //     return <Navigate to="/login" state={{ from : location }} replace></Navigate>
    // }
    if (!isAuthenticated) {
        return <Navigate to="login" state={{ from : location }} replace></Navigate>
    }
  return children
}

export default ProtectedRoute