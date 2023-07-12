
import '../assets/scss/chat.scss'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import { allUsersRoute, host } from '../utils/APIRoutes'

import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'

function Chat() {
  const socket = useRef();

  const navigate = useNavigate();
  // 用户列表
  const [contacts, setContacts] = useState([]);
  // 当前登录账户信息
  const [currentUser, setCurrentUser] = useState(undefined);
  // 通讯列表
  const [currentChat, setCurrentChat] = useState(undefined);

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    (async function fn() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')))
        setIsLoaded(true);
      }
    })()
  }, [])
  useEffect(() => {
    (async function fn() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          await axios.get(`${allUsersRoute}/${currentUser._id}`).then(res => {
            setContacts(res.data)
          }).catch(err => {
            console.log('err ==> ', err);
          })
        } else {
          navigate('/setAvatar');
        }
      }
    })()
  }, [currentUser]);

  const handleChatChange = async (chat) => {
    setCurrentChat(chat);
  }

  return (
    <div className='chat'>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={(chat) => { handleChatChange(chat) }} />
        {
          isLoaded && currentChat === undefined ?
            <Welcome currentUser={currentUser} /> :

            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        }
      </div>
    </div>
  )
}

export default Chat