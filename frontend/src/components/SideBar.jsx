import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setUserData } from '../redux/userSlice';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;




const SideBar = () => {

  let { userData, otherUsers } = useSelector((state) => state.user)
  let dispatch = useDispatch();

  const [search, setSearch] = useState(false);
  console.log(otherUsers);
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const result = await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }



  return (
    <div className='lg:w-[30%] w-full h-full bg-slate-200'>
      {/* Logout button */}
      <div className='mt-[10px] w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full shadow-gray-500 shadow-lg  bg-[#20c7ff] cursor-pointer fixed bottom-[10px] left-[10px] text-gray-700' onClick={handleLogout}>
        <TbLogout2 className='w-[25px] h-[25px] ' />
      </div>

      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[10px]'>
        <div>
          <h1 className='text-white font-bold text-[25px]'>Connectify</h1>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-gray-800 font-bold text-[25px]'>
              Hi, {userData.user.name || "User"}
            </h1>
            <div className='w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full cursor-pointer' onClick={() => navigate('/profile')}>
              <img src={userData.user.image || dp} alt="Profile Picture" className='h-[100%] shadow-lg shadow-gray-500' />
            </div>
          </div>
        </div>
        <div className='w-full flex items-center gap-[20px]'>
          {!search && <div className='mt-[10px] w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full shadow-gray-500 shadow-lg  bg-white cursor-pointer' onClick={() => setSearch(!search)} >
            <IoIosSearch className='w-[25px] h-[25px] ' />
          </div>}
          {search && <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
            <input type="text" placeholder="Search user..." className='w-full h-full p-[10px] outline-0  border-0 text-[17px]' />
            <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setSearch(!search)} />

          </form>}
          {!search && otherUsers?.users?.map((user) => (
            <div key={user._id} className='w-[60px] h-[60px]  shadow-gray-500 shadow-lg flex items-center justify-center gap-[10px] mt-[10px] rounded-full overflow-hidden'>
              <img src={user.image || dp} alt="Profile Picture" className='h-[100%]' />

            </div>
          ))}
        </div>
      </div>

      <div className='w-full h-[60vh] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
        {otherUsers?.users?.map((user) => (
          <div key={user._id} className='w-[95%] h-[60px] flex  items-center gap-[20px] shadow-gray-500 bg-white shadow-lg  rounded-full hover:bg-[#b4b4d6] cursor-pointer'>
            <div key={user._id} className='w-[60px] h-[60px]  shadow-gray-500 shadow-lg flex items-center justify-center gap-[10px] rounded-full overflow-hidden'>
              <img src={user.image || dp} alt="Profile Picture" className='h-[100%]' />

            </div>
            <h1  className='text-gray-800 font-semibold text-[20px]' >{user.name || user.userName}</h1>
          </div>
        ))}
      </div>

    </div>
  )
}

export default SideBar
