
import '../assets/scss/register.scss';

import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom'

import Logo from '../assets/logo.svg'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';

function Register() {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error('密码不一致,请重新确认', toastOption);
      return false;
    } else if (username.length < 3) {
      toast.error('用户名不得小于3位', toastOption);
      return false;

    } else if (password.length < 8) {
      toast.error('密码长度不得小于8位', toastOption);
      return false;
    } else if (email === '') {
      toast.error('邮箱不得为空', toastOption);
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
        <input type="text" placeholder='用户名' name='username' onChange={e => { handleChange(e) }} />
        <input type="email" placeholder='邮箱' name='email' onChange={e => { handleChange(e) }} />
        <input type="password" placeholder='密码' name='password' onChange={e => { handleChange(e) }} />
        <input type="password" placeholder='确认密码' name='confirmPassword' onChange={e => { handleChange(e) }} />
        <button type='submit'>注册用户</button>
        <span>
          已经有账户了吗？<Link to="/login">登录</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  )
}


export default Register