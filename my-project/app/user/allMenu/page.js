
"use client"
import Header from '@/components/header'
import React, { useEffect, useState } from 'react'
import axios from "axios"
import UserMenuCard from '@/components/UserMenuCard'
const page = () => {
    const [data,setData] = useState([])

    const url = `http://localhost:4000/user/menu`;
    useEffect(() => {
        const fetchData = async () => {
          try {
           const headers = {
              Authorization: `Bearer ${localStorage.getItem('token')}`, 
              'Content-Type': 'application/json', 
            };   
             const response = await axios.get(url,{headers});
            console.log(response.data);
            setData(response.data.menu);
            console.log(data);
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData();
      },[]);
    
    
  return (
    
        <div className='h-screen overflow-auto'>
        <Header title="Menu"/>
        <div className='grid gap-4 mt-20 p-8 w-full grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>
          {data.map((menu,index)=> (
            
            <UserMenuCard  menu = {menu} index={index}  />
          ))}
        </div>
    </div>
    
  )
}

export default page