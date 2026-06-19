import React from 'react'
import dp from '../assets/dp.webp'

const ReceiverMessage = ({image, message}) => {
    return (
        <div className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[#20c7ff] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0 shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
            {image && <img src={image} alt="" className='w-[150px] rounded-lg'
         />}
     {message && <span> {message} </span>}
        </div>
    )
}

export default ReceiverMessage
