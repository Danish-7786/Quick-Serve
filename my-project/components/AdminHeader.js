"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
const AdminHeader = ({active}) => {
    const router = useRouter();

 
  return (
    <div>
       
      <div className='flex fixed top-0 w-full pr-10 pl-4 pt-2 backdrop-blur-md  bg-white/30 blur-10 justify-between items-center' > 
        <div className='flex gap-2'>

        <button value="shop" 
        onClick={
             (e)=> 
             {
              router.push('/admin/addShop')
             }
            } 
                className={active=='shop'?'text-xl sm:text-3xl underline text-accent font-bold':'text-xl sm:text-3xl'}>Your Shops</button>
        <button value="order" onClick={(e)=> {
            router.push('/admin/orders')
          
            }} className={active=='order'?'text-xl sm:text-3xl underline text-accent font-bold':'text-xl sm:text-3xl'}>Your Orders</button>
        </div>
       
        <Image
          className="p-1 bg-main shadow-lg rounded-full"
          src="/git-danu.jpg"
          height={70}
          width={70}
          
          alt="profile-img"
        />
      </div>
      </div>
      
  )
}

export default AdminHeader