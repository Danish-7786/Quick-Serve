import React from 'react'
import  Image  from 'next/image'
import UserShopCard from './UserShopCard'

const Header = ({title}) => {
  return (
     
    <div className="z-20 top-0 fixed w-full bg-white/30 backdrop-blur-md px-4 py-2 flex flex-col gap-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-3xl font-bold text-text">{title}</h2>
        <Image
          className="bg-main shadow-lg border-4 p-1 rounded-full"
          src="/git-danu.jpg"
          height={60}
          width={60}
          alt="profile-img"
        />
      </div>

    
</div>
  )
}

export default Header