"use client"
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import {useState,Fragment,useEffect} from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ShopCard from '@/components/ShopCard';
import {useRouter} from 'next/navigation'
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';

const page = () => {
      const [open, setOpen] = useState(false);
      const [shopName,setShopname] = useState('')
      const [image,setImage] = useState('')
      const [location,setLocation] = useState('')
      const [paymentQR,setPaymentQR] = useState('')

      let [data,setData] = useState([]);
      const [fetchDep,setFetchDep] = useState(false)
     const router = useRouter();
      const handleRoute = ()=> {
        router.push('/admin/menu')
      
        }
        const handleClickOpen = (e) => {          
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };


        const handleCreate= async ()=> {
          try {
              const headers = {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace 'your_access_token' with the actual token
                'Content-Type': 'application/json', // Adjust the content type based on your API requirements
              };
              
              const response = await axios.post('http://localhost:4000/admin/createShop', {
                shopName,
                location,
                image
              },
              { 
                headers
              }
              );
              

              // Assuming your server sends a token upon successful login
              console.log("resp",response);
              console.log('shop created successfully! shopId',response.data);
              setOpen(false)
              setFetchDep(true);

              // Redirect or perform other actions after successful login
            } 
            catch (error) {
              console.log(localStorage.getItem('token'));
              
              console.log('Error during login:', error);
              // Handle login error, show an error message, etc.
            }
        }


        useEffect(() => {
          const fetchData = async () => {
            try {
             const headers = {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace 'your_access_token' with the actual token
                'Content-Type': 'application/json', // Adjust the content type based on your API requirements
              };
              // Make the GET request
              const response = await axios.get('http://localhost:4000/admin/shops',
              {  
                  headers
              }
              );
              console.log(response.data);
              setData(response.data.myShop);
                
              // Set the data in the state
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
      
          // Call the fetchData function
          fetchData();
        },[fetchDep]);
        

        
        return (
    <div className="w-screen h-screen overflow-auto">
      <div className="px-6 py-2 flex flex-col gap-6">
        <div className='mb-16'>

        <AdminHeader active='shop'/>
        </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full'>

        { data.map((shop, index) => (
          
          <Link 
          href={{ 
            pathname: '/admin/menu', 
            query: {
              shopId:shop._id,
            },
            }}>
           
         <ShopCard shop ={shop} key={index} handleRoute ={handleRoute}/>
         </Link>
         )        
         )
        }
        </div>
    


        <Fragment>
        <button onClick={handleClickOpen} className='w-full py-3 bg-accent rounded-lg flex justify-center items-center'>
       <span className='text-3xl text-white flex gap-8'>
        
         Add Shop   <FaPlus/>
        </span>
       </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Shop</DialogTitle>
        <DialogContent>
          
          <TextField
            autoFocus
            margin="dense"
            id="shopname"
            label="Shop Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setShopname(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="image"
            label="Image Link"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setImage(e.target.value)}
          />
                <TextField
            autoFocus
            margin="dense"
            id="location"
            label="location"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setLocation(e.target.value)}
          />
            <TextField
            autoFocus
            margin="dense"
            id="payment"
            label="paymentQR image Link"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setPaymentQR(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Fragment>

      </div>
    </div>

  )
}

export default page