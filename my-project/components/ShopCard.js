"use client"
import React from 'react'

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';


const ShopCard = ({shop,index,handleRoute}) => {
const {shopName,location,image,_id} = shop;
console.log(image);


  return (
    
        <Card  className='hover:bg-main hover:text-white w-fit shadow-md p-2' key={index} sx={{  }}>
   <CardMedia
    component="img"
    sx={{ width: 200 ,height:200}}
  
    image={image||'https://justguwahatithings.com/wp-content/uploads/2021/12/image_editor_output_image1529875202-1640001811888.jpg'}
    alt="shop img"
  />
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <CardContent sx={{ flex: '1 0 auto' }}>
      <Typography component="div" className='font-bold' variant="h5">
        {shopName}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" component="div">
        {location}
      </Typography>
    </CardContent>
   
  </Box>
  
</Card>
  )
}

export default ShopCard