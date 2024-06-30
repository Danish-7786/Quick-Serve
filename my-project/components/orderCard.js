'use client'

import Image from 'next/image';

const OrderCard = ({order}) => {
    const {price,image,itemName} = order;
    console.log(image);

  return (
    <div className='flex p-4 shadow-md rounded-lg hover:bg-main hover:text-white gap-4'>
     <div>
        <img src={image} alt=""  className='w-24 h-24 '/>
     </div>
     <div>
        <h3 className='text-2xl font-bold'>{itemName}</h3>
        <p>{price}rs</p>
     </div>

    </div>
  )
}

export default OrderCard