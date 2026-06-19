import React from 'react'
import dp from '../assets/dp.webp'

const SenderMessage = ({image, message}) => {
  return (
    <div className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[rgb(23,151,194)] text-white text-[19px] rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
        {image && <img src={image} alt="" className='w-[150px] rounded-lg'
         />}
     {message && <span> {message} </span>}
    </div>
  )
}

export default SenderMessage
