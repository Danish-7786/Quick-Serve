"use client"
    import React from 'react'
    import Box from '@mui/material/Box';
    import Card from '@mui/material/Card';
    import CardContent from '@mui/material/CardContent';
    import CardMedia from '@mui/material/CardMedia';
    
    import Typography from '@mui/material/Typography';
    
    
   
const MenuCard = ({menu,index}) => {
    const {itemName,image,fullPrice} = menu;
      return (
        
            <Card className='w-fit p-2 hover:bg-main hover:text-white'  key={index} sx={{ }}>
       <CardMedia
        component="img"
        className='rounded-lg'
        sx={{ width: 250, height:200 }}
        image={image}
        alt="shop img"
      />
       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {itemName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {fullPrice} $
          </Typography>
         </CardContent>
{/* hey there i am danish khan from anime staan aap log waqif hai mujhse */}
       
      </Box>
      
    </Card>
      
  )
}

export default MenuCard;