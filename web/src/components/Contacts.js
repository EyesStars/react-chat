
import '../assets/scss/contacts.scss'
import React, { useState, useEffect } from 'react'

import Logo from '../assets/logo.svg'

export default function Contacts({ contacts, currentUser, changeChat }) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelect, setCurrentSelect] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (contact, index) => {
    setCurrentSelect(index);
    changeChat(contact);
  }

  return (
    <div className='contacts-box'>
      {
        currentUserName && currentUserImage && (
          <div className='container-box'>
            <div className='brand'>
              <img src={Logo} alt="Logo" />
              <h3>用户列表</h3>
            </div>
            <div className="contacts">
              {
                contacts.map((item, index) => {
                  return (
                    <div className={`contact ${index === currentSelect ? "selected" : ""}`} key={index} onClick={() => { changeCurrentChat(item, index) }}>
                      <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${item.avatarImage}`} alt="avatar" />
                      </div>
                      <div className="username">
                        <h3>{item.username}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <div className="current-user">
              <div className="avatar">
                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}
