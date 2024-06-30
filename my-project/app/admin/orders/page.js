'use client'

import Image from 'next/image';
import { useState,useEffect } from 'react';
import AdminHeader from '@/components/AdminHeader'
import OrderCard from '@/components/orderCard'
import React from 'react'
import axios from 'axios'
const page = () => {
  const [data,setData]= useState([])
  useEffect(() => {
      const fetchData = async () => {
        try {
         const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace 'your_access_token' with the actual token
            'Content-Type': 'application/json', // Adjust the content type based on your API requirements
          };
          // Make the GET request
          const response = await axios.get('http://localhost:4000/admin/myOrder',
          {  
              headers
          }
          );
          console.log(response.data);
          setData(response.data.myOrder);
            
          // Set the data in the state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      // Call the fetchData function
      fetchData();
    },[]);
  return (
    <div>
        <AdminHeader active="order" />
        <div className='mt-20 flex flex-col gap-4 p-4'>

        {data.map((order)=>(
          
          <OrderCard order={order}/>
          ))}
          </div>
    </div>
  )
}

export default page