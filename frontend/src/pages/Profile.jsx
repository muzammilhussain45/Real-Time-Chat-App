import React, { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';
import axios from 'axios';



const Profile = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  let { userData } = useSelector(state => state.user)
  let navigate = useNavigate();

  const [name, setName] = useState(userData.user.name || "");
  const [avatar, setAvatar] = useState(userData.user.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const image = useRef();

  let dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setAvatar(URL.createObjectURL(file));
  }

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(`${backendUrl}/api/user/profile`, formData, { withCredentials: true });
    setSaving(false);

      dispatch(setUserData(result.data));
      console.log(result);
    }
    catch (error) {
      console.error(error);
    setSaving(false);

    }
  }



    return (
      <div className='w-full h-[100vh] bg-slate-200 flex flex-col items-center justify-center'>
        <div onClick={() => navigate('/')} className='cursor-pointer fixed top-[20px] left-[20px]'>
          <IoMdArrowBack className='w-[40px] h-[40px] text-gray-600' />

        </div>
        <div className='relative bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg ' onClick={() => image.current?.click()}>
          <div className='w-[200px] h-[200px] overflow-hidden flex items-center justify-center rounded-full'>
            <img src={avatar} alt="Profile Picture" className='h-[100%]' />
          </div>
          <div className='absolute bottom-4 right-4 w-[35px] h-[35px] text-gray-700 rounded-full bg-[#20c7ff] flex items-center justify-center'>
            <IoCameraOutline className='w-[25px] h-[25px] text-gray-700' />
          </div>
        </div>
        <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-around mt-4' onSubmit={handleProfile}>
          <input type="file" accept='image/*' ref={image} hidden onChange={handleImage} />
          <input type="text" placeholder='Name' className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]' value={name} onChange={(e) => setName(e.target.value)} />
          <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]' value={userData?.user.userName} />
          <input type="email" readOnly value={userData?.user.email} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-400 text-[19px]' />
          <button disabled={saving} className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-lg shadow-gray-400 text-[20px] mt-[20px] hover:shadow-inner'>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>

      </div>
    )
  }

  export default Profile
