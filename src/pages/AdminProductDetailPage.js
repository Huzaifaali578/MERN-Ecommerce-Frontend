import React from 'react';
import Navbar from '../features/navbar/Navbar';
import AdminProductDetail from '../features/Admin Products/components/AdminProductDetail';

export default function AdminProductDetailPage() {
    return (
        <>
            <Navbar>
                <AdminProductDetail />
            </Navbar>
        </>
    )
}
