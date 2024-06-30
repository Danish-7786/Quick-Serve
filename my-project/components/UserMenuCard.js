import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import axios from 'axios'
import { useRouter } from 'next/navigation'; 
import { checkout } from '@/checkout';
export default function UserMenuCard({menu,index}) {
  
  const {image,_id,fullPrice,itemName,adminId} = menu;
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
const [message,setMessage] =React.useState('')
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOrder= async ()=> {
    try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace 'your_access_token' with the actual token
          'Content-Type': 'application/json', // Adjust the content type based on your API requirements
        };
        
        
        const response = await axios.post(`http://localhost:4000/user/order/${_id}`, {
          itemName,
          image,
          price:fullPrice,
          adminId,
        },
        { 
          headers
        }
        );
        
        // Assuming your server sends a token upon successful login
        console.log("resp",response);
        console.log('order done',response.data.message);
        const msg = response.data.message
      setMessage(msg)
      
        // Redirect or perform other actions after successful login
      } 
      catch (error) {
        console.log(localStorage.getItem('token'));
        
        console.log('Error during login:', error);
        // Handle login error, show an error message, etc.
      }
      console.log(message);
  }
  return (
    <MDBCard key={index} className='shadow-lg w-80 p-1 grid hover:bg-accent hover:text-white' >
      <MDBCardImage src={image||'/burger.png'} className='w-full object-cover h-40 '  position='top' alt='...' />
      <MDBCardBody>
        <MDBCardTitle>{itemName}</MDBCardTitle>
        <MDBCardText>
          {fullPrice} Rs
        </MDBCardText>
        {/* <MDBBtn href='' onClick={ ()=>{
          // checkout({
          //   lineItems:[{price:"price_1OEP2FSEU8eRRckTV8sM35dZ",quantity:1}]
          // })
          handleOrder
        }
        // router.push('/user/cart') 
        
      }>Order Now</MDBBtn> */}
       <React.Fragment>
      <Button variant="outlined" onClick={(()=>{
checkout({
  lineItems:[{price:'price_1OEP2FSEU8eRRckTV8sM35dZ',quantity:1}]
});
handleOrder()
handleClickOpen()
      })}>
        Order Now
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Order Status"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                 {message} 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
      </MDBCardBody>
    </MDBCard>
  );
}