import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'

const Logout = () => {
    const dispatch=useDispatch()
    
    
    const handleLogout =  ()=>{
        
        dispatch(logout())
       console.log('hello')
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
