"use client"
import Image from 'next/image';
import { FaPlus } from "react-icons/fa";
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ShopCard from '@/components/ShopCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';

const Page = () => {
  const [open, setOpen] = useState(false);
  const [shopName, setShopname] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState('');
  const [paymentQR, setPaymentQR] = useState('');
  const [data, setData] = useState([]);
  const [fetchDep, setFetchDep] = useState(false);
  const router = useRouter();

  const handleRoute = () => {
    router.push('/admin/menu');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreate = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        'http://localhost:4000/admin/createShop',
        { shopName, location, image },
        { headers }
      );

      console.log("resp", response);
      console.log('Shop created successfully! Shop ID:', response.data);
      setOpen(false);
      setFetchDep(true);
    } catch (error) {
      console.log(localStorage.getItem('token'));
      console.log('Error during shop creation:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get('http://localhost:4000/admin/shops', { headers });
        console.log(response.data);
        setData(response.data.myShop);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDep]);

  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="px-6 py-2 flex flex-col gap-6">
        <div className='mb-16'>
          <AdminHeader active='shop' />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full'>
          {data.map((shop, index) => (
            <Link
              href={{
                pathname: '/admin/menu',
                query: { shopId: shop._id },
              }}
              key={index}
            >
              <ShopCard shop={shop} handleRoute={handleRoute} />
            </Link>
          ))}
        </div>

        <Fragment>
          <button onClick={handleClickOpen} className='w-full py-3 bg-accent rounded-lg flex justify-center items-center'>
            <span className='text-3xl text-white flex gap-8'>
              Add Shop <FaPlus />
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
                onChange={(e) => setShopname(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="image"
                label="Image Link"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setImage(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="location"
                label="Location"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                autoFocus
                margin="dense"
                id="payment"
                label="Payment QR Image Link"
                type="text"
                fullWidth
                variant="standard"
                onChange={(e) => setPaymentQR(e.target.value)}
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
  );
};

export default Page;
