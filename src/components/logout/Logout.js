import React from 'react'
import { logout } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = localStorage.getItem('user')

  const handlelogout = (e) => {
    dispatch(logout())
    navigate('/login')
      
  // }
  return (
    <div>
      {user ? <button onClick={handlelogout}>logout</button> : navigate('/')}
      {/* {dispatch(logout())} */}
  
      
    </div>
  )
}
}
export default Logout