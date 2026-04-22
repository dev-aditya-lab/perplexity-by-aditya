import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router';
import Loading from '../../../components/Loading';

export default function AuthProtected({children}) {
    const {user, loading}= useSelector((state) => state.auth);
    if(loading){
        return (
            <Loading
                fullScreen
                label="Preparing your dashboard..."
                detail="Syncing your profile, session, and workspace context"
            />
        )
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
    return (
        <>{children}</>
    )
}
