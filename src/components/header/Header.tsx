

import Link from 'next/link'
import React from 'react'
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css"
import Navbar from './Navbar';
import { HiOutlineXCircle } from "react-icons/hi2";
import { cookies } from 'next/headers';
import axios from 'axios';
import { LogoutHandler } from '@/src/utils/LogoutHandler';
import LogoutButton from './LogoutButton';
import { verifyTokenForPage } from '@/src/utils/verifyToken';



const HeaderPage = async () => {
  const cookieStore = await cookies();
  const token = (cookieStore.get("jwtToken")?.value) as string

  const userData = await verifyTokenForPage(token)

  return (
    <header className={`${styles.headerContainer} lg:rounded-b-2xl py-2 shadow-gray-400 shadow-sm `}>
      <nav>
        <div className='flex justify-between px-5 items-center'>
          {/* Logo */}
          <Link className={`${styles.logo} flex text-3xl text-amber-700 items-center font-bold gap-1`} href="/">
            Cloud <GrTechnology />Housting
          </Link>


          <Navbar isAdmin = {userData?.isAdmin || false} />
          {/* Auth Buttons */}
          {userData ? 
          <>
          <div className='flex gap-5 items-center'>
          <div className='font-bold text-blue-500 text-lg'>{userData.username}</div>
          <LogoutButton />
          </div>
          </> : <div className='flex gap-3'>
            <Link
              className="px-5 py-2 bg-blue-500 font-bold text-white rounded-2xl text-md hover:bg-blue-600 transition"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="px-5 py-2 bg-green-600 font-bold text-white rounded-2xl text-md hover:bg-green-700 transition"
              href="/register"
            >
              Register
            </Link>
          </div>}
        </div>
      </nav>
    </header>
  )
}

export default HeaderPage