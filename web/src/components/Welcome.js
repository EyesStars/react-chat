
import '../assets/scss/welcome.scss'
import React, { useEffect, useState } from 'react'
import Robot from '../assets/robot.gif'

export default function Welcome({ currentUser }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      if (currentUser !== undefined) {
        setUserData(currentUser);
      }
    })
  }, [currentUser])
  return (
    <div className='welcome-box'>
      <img src={Robot} alt="Robot" />
      <h1>欢迎回来,<span>{userData.username}</span>!</h1>
      <h3>请选择开始消息传递的聊天对象</h3>
    </div>
  )
}
