import React from 'react';
import { useSelector } from 'react-redux';
import { loggedInUserSelector } from '../authSlice';
import { Navigate } from 'react-router-dom';

export default function ProtectedAdmin({children}) {
    const user = useSelector(loggedInUserSelector)
    if (!user) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (user && user.role !== "admin") {
        return <Navigate to="/" replace={true}></Navigate>
    }
    return children;
}
