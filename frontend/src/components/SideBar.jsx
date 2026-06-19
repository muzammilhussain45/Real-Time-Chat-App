import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import axios from 'axios';


const backendUrl = import.meta.env.VITE_BACKEND_URL;




const SideBar = () => {

  let { userData, otherUsers, selectedUser, onlineUsers , searchData} = useSelector((state) => state.user)
  let dispatch = useDispatch();

  const [search, setSearch] = useState(false);
  const [input, setInput] = useState("");
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

  const handleSearch = async () => {
    try {
      const result = await axios.get(`${backendUrl}/api/user/search?query=${input}`, { withCredentials: true });
      dispatch(setSearchData(result.data));
      console.log(result)

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input])


  return (
    <div className={`relative lg:w-[30%] w-full h-full lg:block bg-slate-200 ${!selectedUser ? 'block' : 'hidden'} overflow-hidden`}>
      <div
        className='mt-[10px] w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full shadow-gray-500 shadow-lg bg-[#20c7ff] cursor-pointer fixed bottom-[10px] left-[10px] text-gray-700'
        onClick={handleLogout}
      >
        <TbLogout2 className='w-[25px] h-[25px]' />
      </div>

      {search && input.length > 0 && (
        <div className='absolute left-[10px] right-[10px] top-[240px] z-[150] rounded-[28px] border border-white/70 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl overflow-hidden'>
          <div className='flex items-center justify-between px-[18px] py-[14px] border-b border-slate-200/80 bg-slate-50/80'>
            <div>
              <h2 className='text-[18px] font-bold text-slate-900'>Search results</h2>
              <p className='text-[12px] text-slate-500'>{searchData?.length || 0} user{searchData?.length === 1 ? '' : 's'} found</p>
            </div>
            <button
              type='button'
              className='w-[34px] h-[34px] rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200/80 hover:text-slate-900 transition-colors'
              onClick={() => {
                setInput('');
                setSearch(false);
              }}
              aria-label='Close search results'
            >
              <RxCross2 className='w-[20px] h-[20px]' />
            </button>
          </div>

          <div className='max-h-[320px] overflow-y-auto p-[10px]'>
            {searchData?.length > 0 ? (
              searchData.map((user) => (
                <button
                  key={user._id}
                  type='button'
                  className='w-full flex items-center gap-[14px] rounded-[20px] px-[12px] py-[12px] text-left transition-all duration-200 hover:bg-[#eaf7ff] hover:shadow-[0_8px_20px_rgba(32,199,255,0.16)]'
                  onClick={() => {
                    dispatch(setSelectedUser(user));
                    setInput('');
                    setSearch(false);
                  }}
                >
                  <div className='relative shrink-0'>
                    <div className='w-[54px] h-[54px] rounded-full overflow-hidden ring-2 ring-white shadow-lg bg-slate-100'>
                      <img src={user.image || dp} alt='Profile Picture' className='w-full h-full object-cover' />
                    </div>
                    {onlineUsers?.includes(user._id) && (
                      <span className='absolute bottom-[2px] right-[2px] w-[12px] h-[12px] rounded-full bg-emerald-500 ring-2 ring-white'></span>
                    )}
                  </div>

                  <div className='min-w-0 flex-1'>
                    <div className='flex items-center gap-[8px]'>
                      <h1 className='truncate text-[16px] font-semibold text-slate-900'>{user.name || user.userName}</h1>
                      {onlineUsers?.includes(user._id) && (
                        <span className='rounded-full bg-emerald-50 px-[8px] py-[2px] text-[11px] font-semibold text-emerald-600'>Online</span>
                      )}
                    </div>
                    <p className='truncate text-[13px] text-slate-500'>Tap to start chatting</p>
                  </div>
                </button>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center px-[18px] py-[36px] text-center'>
                <div className='mb-[12px] flex h-[64px] w-[64px] items-center justify-center rounded-full bg-[#eaf7ff] text-[#20c7ff] shadow-inner'>
                  <IoIosSearch className='h-[28px] w-[28px]' />
                </div>
                <h3 className='text-[16px] font-semibold text-slate-900'>No users found</h3>
                <p className='mt-[4px] max-w-[240px] text-[13px] leading-5 text-slate-500'>Try a different name or username to find the person you want.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className='w-full h-[300px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[10px]'>
        <div>
          <h1 className='text-white font-bold text-[25px]'>Connectify</h1>
          <div className='w-full flex justify-between items-center'>
            <h1 className='text-gray-800 font-bold text-[25px]'>Hi, {userData.user.name || 'User'}</h1>
            <div className='w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full cursor-pointer' onClick={() => navigate('/profile')}>
              <img src={userData.user.image || dp} alt='Profile Picture' className='h-[100%] shadow-lg shadow-gray-500' />
            </div>
          </div>
        </div>

        <div className='w-full flex items-center gap-[20px]'>
          {!search && (
            <div className='mt-[10px] w-[60px] h-[60px] overflow-hidden flex items-center justify-center rounded-full shadow-gray-500 shadow-lg bg-white cursor-pointer' onClick={() => setSearch(!search)}>
              <IoIosSearch className='w-[25px] h-[25px]' />
            </div>
          )}

          {search && (
            <div className='relative w-full h-[60px] mt-[10px] rounded-full overflow-hidden bg-white shadow-[0_12px_28px_rgba(15,23,42,0.14)] ring-1 ring-slate-200 flex items-center px-[16px] gap-[10px]'>
              <IoIosSearch className='h-[22px] w-[22px] shrink-0 text-slate-400' />
              <input
                type='text'
                placeholder='Search users by name or username...'
                className='w-full h-full outline-none border-0 bg-transparent text-[16px] text-slate-800 placeholder:text-slate-400'
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button
                type='button'
                className='shrink-0 flex h-[32px] w-[32px] items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-900'
                onClick={() => setSearch(false)}
                aria-label='Close search'
              >
                <RxCross2 className='h-[20px] w-[20px]' />
              </button>
            </div>
          )}
        </div>

        {!search &&
          otherUsers?.users?.map((user) =>
            onlineUsers?.includes(user._id) ? (
              <div
                className='cursor-pointer mt-[10px] relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center'
                key={user._id}
                onClick={() => dispatch(setSelectedUser(user))}
              >
                <div className='w-[60px] h-[60px] shadow-gray-500 shadow-lg flex items-center justify-center gap-[10px] rounded-full overflow-hidden'>
                  <img src={user.image || dp} alt='Profile Picture' className='h-[100%]' />
                </div>
                <span className='w-[12px] h-[12px] rounded-full bg-green-500 absolute bottom-[6px] right-[1px] shadow-gray-500 shadow-md'></span>
              </div>
            ) : null,
          )}
      </div>

      <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
        {otherUsers?.users?.map((user) => (
          <div key={user._id} className='w-[95%] h-[60px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b4b4d6] cursor-pointer' onClick={() => dispatch(setSelectedUser(user))}>
            <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center'>
              <div className='w-[60px] h-[60px] shadow-gray-500 shadow-lg flex items-center justify-center gap-[10px] rounded-full overflow-hidden'>
                <img src={user.image || dp} alt='Profile Picture' className='h-[100%]' />
              </div>
              {onlineUsers?.includes(user._id) && <span className='w-[12px] h-[12px] rounded-full bg-green-500 absolute bottom-[6px] right-[1px] shadow-gray-500 shadow-md'></span>}
            </div>
            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar
