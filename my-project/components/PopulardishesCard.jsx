"use client"
import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
const PopulardishesCard = ({imgUrl,imgName,dishName,dishPrice}) => {
  const router = useRouter();
  const handleClick = ()=> {
    router.push('/user/order')
  }
  return (
    <div className='flex flex-col bg-white/30 backdrop-blur-xl w-fit px-4  py-3 rounded-lg shadow-lg gap-3 '>
        <Image src={imgUrl} width={100} height={100} alt={imgName}/>
        <h1 className=' text-lg font-semibold text-violet-600'>{dishName}</h1>
        <div className='flex justify-between '>

        <span className='text-sm text-yellow-600 '> {dishPrice} Rs.</span>
        <button onClick={handleClick} className='self-end'><Image src="/plus.png" width={20} height={20} alt="plus"/> </button>
        </div>
    </div>
  )
}

export default PopulardishesCard