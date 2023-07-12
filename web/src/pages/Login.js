
import '../assets/scss/register.scss';
import React, { useEffect, useState } from 'react';

import {
  Link, useNavigate
} from 'react-router-dom'

import Logo from '../assets/logo.svg'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

function Login() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  // toast提示
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/');
    }
  }, [])

  const handleSubmit = async (event) => {
    // 阻止默认事件
    event.preventDefault()
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password
      })
      if (data.status === false) {
        toast.error(data.msg, toastOption)
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }
  const handleValidation = () => {
    const { password, username } = values;
    if (password === '') {
      toast.error('请输入密码', toastOption);
      return false;
    } else if (username.length === '') {
      toast.error('请输入用户名', toastOption);
      return false;
    }
    return true
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }


  return (
    <div className='register'>
      <form onSubmit={(event) => { handleSubmit(event) }}>
        <div className="brand">
          <img src={Logo} alt="Login" />
          <h1>snappy</h1>
        </div>
        <input type="text" placeholder='用户名' name='username' min='3' onChange={e => { handleChange(e) }} />
        <input type="password" placeholder='密码' name='password' onChange={e => { handleChange(e) }} />
        <button type='submit'>登录</button>
        <span>
          还没有账户吗？<Link to="/register">注册</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}


export default Login