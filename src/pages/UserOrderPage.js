import React from "react";
import UserOrders from "../features/user/component/userOrders";
import Navbar from "../features/navbar/Navbar";

export default function UserOrderPage() {
    return (
        <>
            <Navbar>
            <h1 className='text-4xl m-9 font-bold text-center'> My Orders  </h1>
            <UserOrders />
            </Navbar>

        </>
    )
}