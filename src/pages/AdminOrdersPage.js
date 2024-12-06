import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrder from '../features/Admin Products/components/AdminOrder'

export default function AdminOrdersPage() {
  return (
      <div>
          <Navbar>
              <AdminOrder />
          </Navbar>
    </div>
  )
}
