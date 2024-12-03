import React from "react";
import UserOrders from "../features/user/component/userOrders";
import Navbar from "../features/navbar/Navbar";

export default function UserOrderPage() {
    return (
        <>
            <Navbar>
            <h1 className="m-auto text-3xl"> My Orders  </h1>
            <UserOrders />
            </Navbar>

        </>
    )
}