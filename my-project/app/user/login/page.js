"use client"
import React from 'react'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import Input from './../../../components/input'
const page = () => {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('')

  const router = useRouter()
  const handleLogin = async ()=> {
    try {

      const response = await axios.post('http://localhost:4000/user/login', {
        username: username,
        password: password,
      });
      
      // Assuming your server sends a token upon successful login
      console.log("resp",response);
      const token = response.data.token;
      localStorage.setItem("token",token)
      if(token){
        router.push('/user/shops');
      }
      console.log('Login successful! Token:', token);

      // Redirect or perform other actions after successful login
    } 
    catch (error) {
      alert(error.response.data.message)
      console.log('Error during login:', error.response.data.message);
      // Handle login error, show an error message, etc.
    }

   
  }
  
  return (
    
    <div className='
    flex flex-col items-center gap-8
    bg-gradient-to-b from-violet-900 to-violet-500 
    w-screen h-screen overflow-auto'>
        <Image src="/burger.png"
         width={250} height={250} 
         className='bg-purple-400 bg-opacity-50 px-4 py-10 rounded-full mt-14'/>
      
         <p>{username}</p>

       <div className='bg-purple-400 bg-opacity-50 p-8 w-fit h-fit flex flex-col items-center gap-5 rounded-lg'>
      
       <Input type="text" value={username} name ="username" title="Email" handleChange={(e)=>{setUsername(e.target.value) 
      console.log(username)}} />
       <Input type="password" value={password} name ="password" title="Password" handleChange ={(e)=> {setPassword(e.target.value)
       console.log(password)}} />

        

        <button onClick={handleLogin} className='bg-indigo-500 hover:bg-indigo-600 w-full shadow-lg shadow-indigo-500/50 p-2 text-xl rounded-lg  text-white font-semibold'>Login</button>
       <a onClick={()=> router.push('/user/signup') } className='text-white underline cursor-pointer' >New to Quick Serve?</a>
       {/* : <a onClick={()=> setToggler(false)} className='text-white underline' >New to QuickServe?</a>  */}
        <div className='flex gap-8 '>
        <a>
          <Image src="/google.png" className='bg-white p-1.5 rounded-full ' width={35} height={35}></Image>
        </a>
        <a className='bg-white w-fit px-3 py-2 rounded-full'>
          <Image src="/facebook.png" className='bg-white  rounded-full ' width={10} height={10}></Image>
        </a>
        </div>
        



       </div>
    </div>
  )
}

export default page