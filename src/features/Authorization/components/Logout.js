import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loggedInUserSelector, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const dispatch = useDispatch()
  const user = useSelector(loggedInUserSelector)
    useEffect(() => {
        dispatch(signOutAsync())
    })
  return (
      <div>
      {!user &&<Navigate to="/login" replace={true} />}
    </div>
  )
}
