import React from 'react'
import Navbar from '../features/navbar/Navbar'
import MyProfile from '../features/user/component/userProfile'

export default function MyProfilePage() {
  return (
      <div>
          <Navbar>
              <h1 className='text-4xl m-9 font-bold text-center'>My Profile</h1>
              <MyProfile />
          </Navbar>
    </div>
  )
}
