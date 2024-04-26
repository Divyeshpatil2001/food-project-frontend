import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import Profile from '../profile/Profile'

function ProfileAdmin() {
  return (
    <>
        <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 6 }}>
          <Navbar />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Profile />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileAdmin