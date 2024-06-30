import React from 'react'
import { FaRegUser,FaUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { GoHome,GoHomeFill } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { PiShoppingCart,PiShoppingCartFill} from "react-icons/pi";
const Footer = () => {
    const router = useRouter();
    const cartItem =0;
  return (
    <div className='fixed bottom-0 w-full  bg-background/40 backdrop-blur-lg flex justify-between py-3 px-4'>
<a onClick={()=>router.push('/user/shops')} href="">

<GoHome size={25} />
</a>
<a href="" onClick={()=>router.push('/user/shops')}>

<FaSearch  size={22}/>
</a>
<a href="" onClick={()=>router.push('/user/cart')}>

<div className='relative'>
   <span value={cartItem} className= '-right-1 bottom-3.5 absolute bg-green-500 py-1/2 px-1 text-white rounded-full text-xs' >{cartItem}</span>
<PiShoppingCart size={25}/>
</div>
</a>
<a href="" onClick={()=>router.push('/user/shops')}>

<FaRegUser size={22}/>
</a>
    </div>
  )
}

export default Footer