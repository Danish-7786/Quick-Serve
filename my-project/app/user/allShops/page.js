"use client"
import React from 'react'
import Header from '@/components/header'
import { useState,useEffect } from 'react';
import axios  from 'axios';
import Link from "next/link"
import UserShopCard from '@/components/UserShopCard';

const Page = () => {

    const [data,setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
         const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`, 
            'Content-Type': 'application/json', 
          };   
           const response = await axios.get(`http://localhost:4000/user/shops`,{  
              headers
          }
          );
          console.log(response.data);
          setData(response.data.shops);
          console.log(data);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    },[]);
    console.log(data);
    data.map(({image})=> {
       console.log(image);
    })
  
  return (
    <div>
     <Header/>
     <div className='grid gap-4 justify-items-center w-full grid-cols-1 md:grid-cols-4 sm:grid-cols-2'>

     {
         data.map((shop,index)=> (
          <Link 
        href={`/user/menu?shopId=${shop._id}`}>
        <UserShopCard key={index} shop={shop} />
       </Link>
         ))
            }
            </div>
    </div>
  )
}

export default Page