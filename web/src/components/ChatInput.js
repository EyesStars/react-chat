import '../assets/scss/chatinput.scss'

import React, { useState } from 'react'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
export default function ChatInput({ handelSendMsg }) {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message += event.emoji;
    setMsg(message)
  }
  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handelSendMsg(msg);
      setMsg('');
    }
  }
  return (
    <div className='chat-input'>
      <div className='button-container'>
        <div className="emoji">
          <BsEmojiSmileFill onClick={() => { handleEmojiPickerHideShow() }} />
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>
      <form className='input-container' onSubmit={(event) => { sendChat(event) }}>
        <input type="text" placeholder='请输入信息...' value={msg} onChange={(e) => { setMsg(e.target.value) }} />
        <button className='submit'>
          <IoMdSend />
        </button>
      </form>
    </div>
  )
}
