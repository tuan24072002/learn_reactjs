import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRouteAdmin = (props) => {
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to={'/login'} />
    }
    if (account.role !== 'ADMIN') {
        return <Navigate to={'/'} />
    }
    return (
        <>{props.children}</>
    )
}

export default PrivateRouteAdmin