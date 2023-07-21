
import '../assets/scss/chatcontainer.scss'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { sendMessagesRoute, getAllMessagesRoute } from '../utils/APIRoutes'
import ChatInput from './ChatInput'
import Logout from './Logout'
import { v4 as uuidv4 } from 'uuid'

export default function ChatContainer({ currentChat, currentUser, socket }) {

  const [messages, setMessages] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    if (currentChat !== undefined && currentUser !== undefined) {
      (async function fn() {
        await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id
        }).then(res => {
          setMessages(res.data)
        }).catch(err => {
          console.log('err ==> ', err);
        })
      })()
    }
  }, [currentChat])

  const handelSendMsg = async (msg) => {
    await axios.post(sendMessagesRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    }).then(res => {
      if (res.data.status === 200) {
        socket.current.emit('send-msg', {
          from: currentUser._id,
          to: currentChat._id,
          message: msg
        })
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs);
      }
    }).catch(err => {
      console.log('err ==> ', err);
    })
  }

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg })
      })
    }
  },[messages])

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages]);

  return (
    <div className='chat-container-box'>
      {
        currentChat && (
          <div className='chat-container'>
            <div className="chat-header">
              <div className="user-details">
                <div className="avatar">
                  <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                </div>
                <div className="username">
                  <h3>{currentChat.username}</h3>
                </div>
              </div>
              <Logout />
            </div>
            <div className="chat-messages">
              {
                messages.map((msg, index) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div className={`message ${msg.fromSelf ? "sended" : "recieved"}`}>
                        <div className='content'>
                          <p>{msg.message}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <ChatInput handelSendMsg={handelSendMsg} />
          </div>
        )
      }
    </div>
  )
}
