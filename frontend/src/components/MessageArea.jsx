import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';


const MessageArea = () => {

  let {selectedUser} = useSelector(state=>state.user)

  let dispatch = useDispatch();
   
  return (
    <div className={`lg:w-[70%] ${selectedUser? "flex": "hidden"} lg:flex w-full h-full bg-slate-200 border-l-2 border-gray-300`}>
    {selectedUser && 
      <div className='gap-[20px] w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[10px]'>

        <div className='cursor-pointer' onClick={() => dispatch(setSelectedUser(null))}>
          <IoMdArrowBack className='w-[40px] h-[40px] text-white' />

        </div>
        <div className='w-[50px] h-[50px]  shadow-gray-500 shadow-lg flex items-center justify-center gap-[10px] rounded-full overflow-hidden'>
          <img src={selectedUser?.image || dp} alt="Profile Picture" className='h-[100%]' />
        </div>
        <h1 className='text-white font-semibold text-[20px]'>{selectedUser?.name || "User"}</h1>

      </div>}

      {!selectedUser &&
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <h1 className='text-gray-700 font-bold text-[50px]'>Welcome to Connectify</h1>
        <span  className='text-gray-700 font-semibold text-[30px]'>Chat Friendly!</span>
        </div>}
    </div>
  )
}

export default MessageArea
