import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useSelector } from 'react-redux'

const Logout = () => {
    const dispatch=useDispatch()
    const user =useSelector((state)=>state.auth)
    
    const handleLogout =(e)=>{
        console.log(user)
        console.log(e)
        dispatch(logout())
    }
  return (
    <div>
      <button onClick={handleLogout} >
        LOGOUT
      </button>
    </div>
  )
}

export default Logout
