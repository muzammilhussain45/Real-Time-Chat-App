import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser, setUserData } from '../redux/userSlice';

const Login = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  let navigate = useNavigate();
  const [password, setPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let dispatch = useDispatch();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${backendUrl}/api/auth/login`, { email, password: passwordValue }, { withCredentials: true });
      dispatch(setUserData(result.data));
      dispatch(setSelectedUser(null));
      navigate('/');
      setEmail("");
      setPasswordValue("");
      setLoading(false);
      setError("");

    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error?.response?.data?.message);

    }
  }


  return (
    <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
        <div className='w-full h-[200px] bg-[#20c7ff] rounded-b-[30%]'>
          <h1 className='text-gray-600 font-bold text-[30px]'>Login to <span className='text-white'>Connectify</span></h1>
        </div>
        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>


          <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]' type="email" placeholder='Email' />

          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] shadow-gray-400 shadow-lg overflow-hidden rounded-lg relative'>
            <input onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} className='w-full h-full outline-none  px-[20px] py-[10px] bg-white text-gray-700 text-[19px]' type={password ? "text" : "password"} placeholder='Password' />
            <span className='cursor-pointer absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold' onClick={() => setPassword(!password)}>
              {password ? "hide" : "show"}
            </span>
          </div>

          {error && <p className='text-red-500 font-semibold'>{error}</p>}

          <button className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-lg shadow-gray-400 text-[20px] mt-[20px] hover:shadow-inner' disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className='cursor-pointer' onClick={() => navigate('/signup')}>
            Don't Have an Account? <span className='text-[#20c7ff] font-bold '>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
