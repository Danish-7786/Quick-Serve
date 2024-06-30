import React from 'react'
import Image from 'next/image'
const Card = ({imgUrl,imgName,name}) => {
  return (
    <div className='flex flex-col items-center'>

    <div className='w-20 h-20 p-1 overflow-auto z-0 bg-white/30 shadow-lg backdrop-blur-lg rounded-lg '>
    <Image className='z-10 w-full h-full' src={imgUrl} height={20} width={20} alt={imgName}/>
    </div>
    <button className='text-xl text-gray-700 hover:text-accent'>{name}</button>
    </div>
  )
}

export default Card