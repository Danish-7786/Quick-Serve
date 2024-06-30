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
import MenuCard from '@/components/MenuCard';
import {useRouter} from 'next/navigation'
import { Dropdown } from 'flowbite-react';

import Link from 'next/link';
import Header from '@/components/header';

const Page = ({searchParams}) => {
  


  const [fetchDep,setFetchDep] = useState(false);
  const [itemName,setItemName] = useState('')
  const [Category, setCategory] = useState('');
      const [image,setImage] = useState('')
      const [fullPrice,setFullPrice] = useState('')
  let [data,setData] = useState([]);
  const [open,setOpen] =useState(false);
 console.log(searchParams.shopId);

const url = `http://localhost:4000/admin/createMenu/${searchParams.shopId}`;

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
      
      url
      const response = await axios.post(url, {
        itemName,
        image,
        fullPrice,
        Category
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
      const response = await axios.get(`http://localhost:4000/admin/getMenu/${searchParams.shopId}`,
      {  
          headers
      }
      );
      console.log(response.data);
      setData(response.data.menu);
      console.log(data);
        
      // Set the data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
},[fetchDep]);


  console.log(Category);
console.log(data);

//   const { data } = router.query;
//   const parsedData = data ? JSON.parse(data) : null;
  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="px-6 py-2 flex flex-col gap-6">
        <Header title="Your Menu"/>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4 mt-20'>

        { data.map((menu, index) => (
          
          <Link 
          href={{ 
            pathname: '/admin/menu', 
            query: {
              menuId:menu._id,
            },
          }}>
           
         <MenuCard menu ={menu} key={index} />
         </Link>
         )        
         )
        }
        </div>

        <Fragment>
        <button onClick={handleClickOpen} className='w-full py-4 bg-accent rounded-lg flex justify-center items-center'>
       <span className='text-3xl text-white flex gap-8'>
        
         Add Dishes   <FaPlus/>
        </span>
       </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Shop</DialogTitle>
        <DialogContent >
          <TextField
            autoFocus
            margin="dense"
            id="itemname"
            label="item Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setItemName(e.target.value)}
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
            id="fullprice "
            label="fullPrice"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e)=> setFullPrice(e.target.value)}
          />
        
       <label htmlFor="myDropdown" className='text-gray-700 mt-4'>Select an category:</label>
      {/* Dropdown with options */}
      <select id="myDropdown" className='p-1 bg-red-500 rounded-lg text-white' value={Category} onChange={(e)=> {setCategory(e.target.value)}}>
        <option value="Rice" onClick= {(e)=> setCategory("Rice")}>Category:</option>
        <option value="Rice" onClick= {(e)=> setCategory("Rice")}>Rice</option>
        <option value="Rolls" onClick= {(e)=> setCategory("Rolls")}>Rolls</option>
        <option value="Breads"onClick= {(e)=> setCategory("Breads")}>Breads</option>
        <option value="Shakes" onClick= {(e)=> setCategory("Shakes")}>Shakes</option>
      </select>
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

export default Page