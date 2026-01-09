import React from 'react'
import { TiTick } from 'react-icons/ti'

export const WebHostingPlan = () => {
  return (
    <div className='bg-white px-15 py-10 rounded-2xl my-5 mx-3'>
      <h1 className='text-3xl text-center my-5 text-pink-500 font-bold'>Premium</h1>
      <strong className='text-4xl text-center'>$4.99/mo</strong>
      <div className='text-red-600 bg-red-300 text-center rounded-xl my-5 w-fit py-2 px-6 mx-auto'>10% OFF</div>
      <div className='font-bold text-lg my-4'>Top Features</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> 100 WebSite</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> 200 GB SSD Strong</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> Weekly Backups</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> Unlimited Banwidth</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> Free SLL</div>
      <div className='flex items-center text text-green-700 my-2'><TiTick /> Free Email</div>
      <button className='border border-black cursor-pointer hover:bg-black hover:text-white transition py-2 px-10 rounded-xl font-bold text-xl text-center my-4 w-full'>Buy Now</button>
    </div>
  )
}
