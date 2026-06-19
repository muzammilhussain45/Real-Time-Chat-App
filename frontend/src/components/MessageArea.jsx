import React, { useRef, useState } from 'react'
import { IoMdArrowBack } from "react-icons/io";
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

import { RiEmojiStickerFill } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import SenderMessage from './SenderMessage';
import ReceiverMessage from './ReceiverMessage';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';



const MessageArea = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let { selectedUser } = useSelector(state => state.user)
  let { messages } = useSelector(state => state.message)
  let userData = useSelector(state => state.user.userData);

  let dispatch = useDispatch();
  let [showPicker, setShowPicker] = useState(false);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);
  let image = useRef();

  const handleSendMessage =async (e) => {
    e.preventDefault();
     try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      let result = await axios.post(`${backendUrl}/api/message/send/${selectedUser._id}`, formData, {withCredentials: true});
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
     } catch (error) {
      console.log(error)
      
     }
  }

  const onEmojiClick = (emojiObject) => {
    setInput(prevInput => prevInput + emojiObject.emoji);
    setShowPicker(false); // Close the emoji picker after selecting an emoji
  }

  const handleImage=(e)=>{
    let file = e.target.files[0];
    setFrontendImage(URL.createObjectURL(file));
    setBackendImage(file);

  }
  

  return (
    <div className={`relative lg:w-[70%] ${selectedUser ? "flex" : "hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>

      {selectedUser &&
        <div className='w-full h-[100vh] flex flex-col'>
        <div className='gap-[20px] w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[10px] '>

          <div className='cursor-pointer' onClick={() => dispatch(setSelectedUser(null))}>
            <IoMdArrowBack className='w-[40px] h-[40px] text-white' />

          </div>
          <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex items-center justify-center bg-white cursor-pointer shadow-gray-500 shadow-lg  gap-[10px] '>
            <img src={selectedUser?.image || dp} alt="Profile Picture" className='h-[100%]' />
          </div>
          <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "User"}</h1>

        </div>

        <div className='w-full h-[550px] flex flex-col py-[30px] px-[20px] overflow-auto gap-[20px]'>
          {
            showPicker &&  <div className='absolute bottom-[120px] left-[20px]'>
              <EmojiPicker className='shadow-lg' width={250} height={350} onEmojiClick={onEmojiClick} />
            </div>
          }

          {messages && messages.map((message)=>(
            message.sender == userData.user._id ? <SenderMessage key={message._id} message={message.message} image={message.image} /> : <ReceiverMessage key={message._id}message={message.message} image={message.image} />
          ))}

        </div>
        </div>}

      {!selectedUser &&
        <div className='w-full h-full flex flex-col justify-center items-center'>
          <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Connectify</h1>
          <span className='text-gray-700 font-semibold text-[30px]'>Chat Friendly!</span>
        </div>}

     {
      selectedUser &&
       <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px] flex items-center justify-center'>
         <img src={frontendImage} alt="" className='w-[80px] absolute bottom-[100px] right-[20%] rounded-lg shadow-lg shadow-gray-400' />
        <form className='w-[95%] lg:w-[70%] h-[60px] bg-[rgb(23,151,194)] shadow-gray-400 shadow-lg rounded-full flex items-center gap-[20px] px-[20px] relative ' onSubmit={handleSendMessage}>
         
          <div onClick={() => setShowPicker(!showPicker)}>
            <RiEmojiStickerFill className='cursor-pointer w-[25px] h-[25px] text-white' />

          </div>
          <input type="file" accept= 'image/*' hidden ref={image} onChange={handleImage} />
          <input type="text" className='w-full h-full px-[10px] outline-none border-0 text[19px] text-white bg-transparent placeholder:white' placeholder='Message' onChange={(e)=>setInput(e.target.value)} value={input}/>
          <div onClick={() => image.current.click()}>
            <FaImages className='cursor-pointer w-[25px] h-[25px] text-white' />
          </div>
          <button>
            <IoSendSharp className='w-[25px] h-[25px] text-white cursor-pointer' />
          </button>
        </form>
      </div>
     }
    </div>
  )
}

export default MessageArea
