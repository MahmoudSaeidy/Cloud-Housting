import React from 'react'
import Image from 'next/image'
import CloudImage from "../../../public/cloud-hosting.png"
import { TiTick } from 'react-icons/ti'
import styles from "./hero.module.css"


export const Hero = () => {
  return (
    <div className={`${styles.hero} flex flex-col md:flex-row`}>
      <div>
       <h1 className='text-5xl my-4 font-bold'>Cloud Hosting</h1>
         <p className='text-gray-600 text-xl'>the best web hosting solution for your online success</p>
        <div className='my-5 text-lg flex flex-col gap-2'>
        <div className='flex gap-3 items-center'>  <TiTick /> Easy To Use Control Panel</div>
        <div className='flex gap-3 items-center'>  <TiTick /> Secure Hosting</div>
        <div className='flex gap-3 items-center'>  <TiTick /> Website Maintenance</div>
       </div>
      </div>
      <Image className='-z-10' src={CloudImage} alt='cloud hosting' width={600} height={600}/>
    </div>
  )
}
