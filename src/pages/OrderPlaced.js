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
            <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-600">Order Successfully Placed</p>
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                        Order Number #{param.id}
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                        Sorry, we couldn't find the page you're looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
