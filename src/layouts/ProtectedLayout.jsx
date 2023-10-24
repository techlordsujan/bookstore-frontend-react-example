import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'

function ProtectedLayout() {
    const { state: auth } = useContext(UserContext);

    if(auth.isLoggedIn && auth.user.role == 'admin') {
        return (
            <Outlet />
        )
    }
    return (<Navigate to="/login" />)
}

export default ProtectedLayout