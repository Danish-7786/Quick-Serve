import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function UserShopCard({shop,index,handleMenu}) {
  const {image,shopName,location,_id} =shop;
  return (
    
    <Card sx={{ width: 345 }} key={index}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
         {shopName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick= {handleMenu} size="small">Check Out the Menu</Button>
        
      </CardActions>
    </Card>
  );
}