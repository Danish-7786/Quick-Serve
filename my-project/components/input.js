import React from 'react'

const Input = ({type="text",value,name,handleChange,title}) => {
  return (
    <div className="relative">
    <input type={type} value={value} name={name} onChange={(e) =>handleChange(e)} placeholder='' className='w-full text-xl h-12 rounded-md px-2 pt-1 bg-white peer outline-none'></input>
    <label htmlFor="email" className='text-text absolute left-2 top-0 text-sm ease-in z-10 peer-placeholder-shown:text-2xl peer-placeholder-shown:top-2'>{title}</label>
      
    </div>
  )
}

export default Input