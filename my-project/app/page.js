
"use client"
import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'

export default function Home() {


  const router  = useRouter();
  return (
    <main className='flex flex-col bg-main w-screen h-screen overflow-auto'>
  
<div className='pt-20 self-center '>

       <Image src="/quickserve.png"  width={350} height={350} alt='logo'/>
</div>
<div className='flex flex-col items-center mt-40 body-font font-poppins p-10'>

    <h2 className='text-4xl font-bold  body-font font-poppins' >Want a Dine?</h2>
    <h2 className='text-3xl font-bold '>then, Why wait in a line</h2>

</div>
<div className='p-4 flex justify-center flex-col self-center'>
  <button onClick={()=> router.push('/user/login')}
  className='font-semibold text-xl mt-10 bg-accent text-white p-2 rounded-md shadow-md '>Get Started As a customer</button>
   <button onClick={()=> router.push('/admin/login')}
  className='font-semibold text-xl mt-10 bg-accent text-white p-2 rounded-md shadow-md'>Get Started As shopkeeper</button>

</div>
    </main>
  

  )
}
