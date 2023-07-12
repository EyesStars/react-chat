
import '../assets/scss/logout.scss'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { BiPowerOff } from 'react-icons/bi'

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.clear();
    navigate('/login');
  }
  return (
    <div className='logout-box'>
      <button onClick={() => { handleClick() }}>
        <BiPowerOff />
      </button>
    </div>
  )
}
