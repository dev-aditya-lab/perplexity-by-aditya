import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';

export default function AuthProtected({children}) {
    const {user}= useSelector((state) => state.auth);
    if(!user){
        return <Navigate to="/login" replace />
    }
    return (
        <>{children}</>
    )
}
