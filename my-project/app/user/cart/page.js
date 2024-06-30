"use client"
import React from 'react'
import axios from 'axios'
import Header from '@/components/header'
import UserCartCard from '@/components/UserCartCard';
const page = () => {
  // const initPayment = (data) => {
	// 	const options = {
	// 		key: "",
	// 		amount: data.amount,
	// 		currency: data.currency,
	// 		name: book.name,
	// 		description: "Test Transaction",
	// 		image: book.img,
	// 		order_id: data.id,
	// 		handler: async (response) => {
	// 			try {
	// 				const verifyUrl = "http://localhost:4000/payment/verify";
	// 				const { data } = await axios.post(verifyUrl, response);
	// 				console.log(data);
	// 			} catch (error) {
	// 				console.log(error);
	// 			}
	// 		},
	// 		theme: {
	// 			color: "#3399cc",
	// 		},
	// 	};
	// 	const rzp1 = new window.Razorpay(options);
	// 	rzp1.open();
	// };

	// const handlePayment = async () => {
	// 	try {
	// 		const orderUrl = "http://localhost:4000/payment/order";
	// 		const { data } = await axios.post(orderUrl, { amount: book.price });
	// 		console.log(data);
	// 		initPayment(data.data);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

  return (
    <div>
        <Header title="My Cart"/>
      <UserCartCard/>
    </div>
  )
}

export default page;