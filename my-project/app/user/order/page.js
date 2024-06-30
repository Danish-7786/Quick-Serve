'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import {FiPlusCircle} from 'react-icons/fi'
import {AiOutlineMinusCircle} from 'react-icons/ai'

const page = ({imgUrl,imgName,dishName,disnPrice}) => {
    const [quantity,setQuantity] = useState(1)
  return (
    <div className='h-screen bg-gradient-to-r from-violet-700 to bg-indigo-600'>
        <div className=' h-[45%] flex justify-center items-center flex-col '>

        <Image src={imgUrl} width={200} height={200} alt={imgName}/>
        </div>
     <div className='flex flex-col p-8 bg-white w-full h-[55%] rounded-tl-[4rem]'>
        <div className='flex justify-between'>

        <div className='w-40'>

        <span className='text-3xl'>{dishName}</span>
        <span>{disnPrice}</span>
        </div>

     <div className='flex h-6 gap-4 items-baseline overflow-hidden'>
     <button onClick={()=>{
        if(quantity<10)
         {
         setQuantity(quantity+1)
        }
         }}><FiPlusCircle className='text-green-500'/></button>
     <p className='text-xl font-semibold'>{quantity}</p>
     
     
     <button onClick={()=> {
        if(quantity>0)
        {

        setQuantity(quantity-1)
       }
        }}>
    <AiOutlineMinusCircle className='text-red-500'/>
     </button>
     </div>
        </div>
      <button className='w-full mt-60 rounded-xl p-4 font-bold font-poppins bg-gradient-to-r from-purple-400 to-indigo-700 h-fit hover:bg-indigo-800 text-white'> Add to Cart </button>
     </div>
        </div>
  )
}

export default page