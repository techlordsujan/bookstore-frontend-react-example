import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { UserContext } from '../contexts/UserProvider'

function ClientProtectedLayout() {
    const { state: auth } = useContext(UserContext);

    if(auth.isLoggedIn && auth.user.role == 'guest') {
        return (
            <Outlet />
        )
    }
    return (<Navigate to="/login" />)
}

export default ClientProtectedLayout;