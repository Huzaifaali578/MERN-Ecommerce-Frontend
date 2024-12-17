import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { resetCartAsync } from '../features/cart/cartSlice';
import { resetOrder } from '../features/Orders/orderSlice';
import { userInfoSelector } from '../features/user/userSlice';

export default function OrderPlaced() {
    const param = useParams()
    const dispatch = useDispatch()
    const user = useSelector(userInfoSelector)

    useEffect(() => {
        // reset Order
        dispatch(resetCartAsync())
        // reset current Order
        dispatch(resetOrder())
    }, [dispatch, user])
    return (
        <>
            {!param.id && <Navigate to="/" replace={true}></Navigate>}
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-green-600">Order Successful!</h1>
                        <p className="text-lg text-gray-700 mt-4">
                            Thank you for your purchase! Your order has been successfully placed.
                        </p>
                        <div className="mt-6">
                            {/* Display dynamic order ID */}
                            <p className="text-md text-gray-600">
                                Order ID: <span className="font-semibold">{param.id}</span>
                            </p>
                            <p className="text-md text-gray-600">
                                You will receive an email confirmation shortly.
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link to="/" className="text-white bg-blue-500 hover:bg-blue-700 px-6 py-2 rounded-md">
                            Go back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
