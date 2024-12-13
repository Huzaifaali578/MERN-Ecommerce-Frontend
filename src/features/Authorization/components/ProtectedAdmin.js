import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { userInfoSelector } from '../../user/userSlice';

export default function ProtectedAdmin({children}) {
    const userInfo = useSelector(userInfoSelector)
    if (!userInfo) {
        return <Navigate to="/login" replace={true}></Navigate>
    }
    if (userInfo && userInfo.role !== "admin") {
        return <Navigate to="/" replace={true}></Navigate>
    }
    return children;
}
