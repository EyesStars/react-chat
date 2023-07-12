
import '../assets/scss/setAvatar.scss'

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom'

import loader from '../assets/loader.gif'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios';
import { setAvatarRoute } from '../utils/APIRoutes';

import { Buffer } from 'buffer';

function SetAvatar() {
  const api = 'https://api.multiavatar.com/12312312';
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState([]);
  const [isLoading, serIsLoading] = useState(true);
  const [selecteAvatar, setSelecteAvatar] = useState(undefined);

  const defaultImage = "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNiMzAwM2U7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZmZjMWMxOyIvPjxwYXRoIGQ9Im04OC4xOCAxOTQuMTFjLTQuMjA3OSAxLjAyMS04LjM1NDUgMi4yNzkyLTEyLjQyIDMuNzY5NXYyNi4wNzJhMTE1LjUgMTE1LjUgMCAwIDAgNzkuNDggMHYtMjYuMDcyYy00LjA4NTgtMS40OTA0LTguMjUyOS0yLjc0ODYtMTIuNDgtMy43Njk1djguNzA1MWMwIDkuMzg4OC03LjYxMTIgMTctMTcgMTdoLTIwLjU4Yy05LjM4ODggMC0xNy03LjYxMTItMTctMTd2LTguNzA1MXoiIHN0eWxlPSJmaWxsOiM0OTFmNDk7Ii8+PHBhdGggZD0ibTEzNy4zOCAxMS4xNDhjLTEyLjIzIDEuOTU5My0xOC41MTEgMTQuNjA2LTQzLjQzNiA5LjQ5MTUtMTEuMjg1LTMuMjA1NC0xNi40MDYtMy41NzMtMjAuMzg5IDAuNTg1OTQtNC4xNTQ4IDQuMzM4NC03LjAzMyAxMi40MzUtOS44MTg0IDIxLjcwNi0yLjEzNTQgNy40MTM2LTMuNzE4NyAxNC4zODEtNC43NDYxIDIxLjY0NmgxMTIuN2MtMy40ODc4LTI0LjI5My0xMC44MjItNDMuMjgxLTI1LjE4Mi01MS4wNjEtMy41MzE0LTEuNjIzLTYuNTI3NC0yLjI5NTktOS4xMjg5LTIuMzYxM3oiIHN0eWxlPSJmaWxsOiMzMzM7Ii8+PHBhdGggZD0ibTExNC4zNyA0My4zODNjLTE5LjQ0NSAwLjA4OC0zOC41MjQgMi4wNzI0LTUyLjM3OSA1LjY5OTItMS4yNzY2IDQuNTc5NS0yLjQzMTcgMTAuMTY5LTMuMjI4NSAxNi44MDdoMTEzLjExYy0wLjgzNzMxLTYuMDEwNy0xLjkxNjQtMTEuNjc0LTMuMzE4NC0xNi45MjQtMTUuMjI5LTMuODg0Mi0zNC44NzMtNS42NjkzLTU0LjE4LTUuNTgyeiIgc3R5bGU9ImZpbGw6I2FmYWZhZjsiLz48cGF0aCBkPSJtMTE1LjUgNTUuNzczYy01OC4zOSAwLTEwNS43MyAxNS40NzYtMTA1LjczIDM0LjU3aDAuMDMxMmMwIDExLjI5NSAxNi40OTYgMjEuMzE5IDQyLjEyNiAyNy42MjctMC4xMDMzMS03Ljc3MDQgMi43ODgtMjEuOTA0IDUuMjczNC0zMS4wMzEgNi4wOTM1LTEuNzE2OCA2LjkyOTQtMS44OTcxIDEzLjE2Ny0yLjk5MTkgMTQuODc0LTIuODI1NiAyOS45OS00LjIwMzcgNDUuMTMzLTQuMTE1MyAxNS4xNDMtMC4wODg0IDMwLjI1OSAxLjI4OTcgNDUuMTMzIDQuMTE1MyA2LjIzNzIgMS4wOTQ3IDcuMjA2NSAxLjI3NTEgMTMuMyAyLjk5MTkgMi40ODU0IDkuMTI2NyA1LjM3NjggMjMuMjYgNS4yNzM0IDMxLjAzMSAyNS42My02LjMwODIgNDEuOTkzLTE2LjMzMiA0MS45OTMtMjcuNjI3aDAuMDMxMmMwLTE5LjA5My00Ny4zNC0zNC41Ny0xMDUuNzMtMzQuNTd6IiBzdHlsZT0iZmlsbDojMjIyOyIvPjxwYXRoIGQ9Im03Mi4wODggODMuNTMzYy02Ljk3NjUgMS4xMTQ3LTEzLjM1NyAyLjg1Ni0xOC40MzkgNC4zNDc3LTEuMTg2MSA3LjQxNS0yLjAwMzggMTguODU4LTEuODkyNiAyNi4yOTMgNC4zMjc4LTAuNjI3OTUgMTAuMTU1LTEuMzY0NCAxMy4yOTUtMS42NDY1LTAuNDA1NTQgMC4zMDE5OCAyLjczNDQtMTcuODI3IDcuMDM3MS0yOC45OTR6bTg2LjgyNCAwYzQuMzAyOCAxMS4xNjcgNy40NDI2IDI5LjI5NiA3LjAzNzEgMjguOTk0IDMuMTM5NiAwLjI4MjEzIDguOTY3MSAxLjAxODUgMTMuMjk1IDEuNjQ2NSAwLjExMTE5LTcuNDM1MS0wLjcwNjUyLTE4Ljg3OC0xLjg5MjYtMjYuMjkzLTUuMDgyMi0xLjQ5MTYtMTEuNDYzLTMuMjMyOS0xOC40MzktNC4zNDc3eiIgc3R5bGU9ImZpbGw6IzZkM2ExZDsiLz48cGF0aCBkPSJtMTMxLjY0IDExNC4wOSA3LjU4MDEtNy41ODAxIDcuNTgwMSA3LjU4MDFtLTYyLjYgMCA3LjU4MDEtNy41ODAxIDcuNTc5OSA3LjU4MDEiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo2LjQ5OThweDtzdHJva2U6IzAwMDsiLz48cGF0aCBkPSJtOTcuMDYgMTQ0LjU5YTIwLjE1IDIwLjE1IDAgMCAwIDM2Ljg4IDQuNTN6IiBzdHlsZT0iZmlsbDojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6Mi45OTk5cHg7c3Ryb2tlOiMwMDA7Ii8+PC9zdmc+"

  // toast轻提示
  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  }

  useEffect(() => {
    if (!localStorage.getItem('chat-app-user')) {
      navigate('/login');
    }
  }, [])

  // 设置用户头像
  const setProfilePicture = async () => {
    if (selecteAvatar === undefined) {
      toast.error('请选择一个头像', toastOption)
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user'));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selecteAvatar]
      })
      if (data.isSet) {
        console.log('data ==> ',data);
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user', JSON.stringify(user));
        navigate('/');
      } else {
        toast.error('设置头像错误,请重新尝试', toastOption)
      }
    }
  };

  useEffect(() => {
    (async function fn() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        ).then(res => {
          const buffer = new Buffer(res.data);
          data.push(buffer.toString("base64"));
        }).catch(err => {
          data.push(defaultImage);
        })
      };
      setAvatar(data);
      serIsLoading(false);
    })()
  }, [])

  return (
    <div>
      {
        isLoading ?
          <div className='SetAvatar'>
            < img src={loader} alt="loader" className='loader' />
          </div >
          :
          <div className='SetAvatar'>
            <div className="title-container">
              <h1>请选择你的用户头像</h1>
            </div>
            <div className="avatars">
              {
                avatar.map((item, index) => {
                  return (
                    <div key={index} className={`avatar ${selecteAvatar === index ? "selected" : ""}`}>
                      <img src={`data:image/svg+xml;base64,${item}`} alt="avatar" onClick={() => { setSelecteAvatar(index) }} />
                    </div>
                  )
                })
              }
            </div>
            <button className='submit-btn' onClick={() => { setProfilePicture() }}>确认设置头像</button>
            <ToastContainer />
          </div>

      }
    </div>

  )
}

export default SetAvatar