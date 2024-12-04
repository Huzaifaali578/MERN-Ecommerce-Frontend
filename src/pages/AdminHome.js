import React from 'react';
import Navbar from '../features/navbar/Navbar';
import { AdminProductList } from '../features/Admin Products/components/AdminProductList';

export default function AdminHome() {
  return (
      <div>
          <Navbar>
              <AdminProductList />
          </Navbar>
    </div>
  )
}
