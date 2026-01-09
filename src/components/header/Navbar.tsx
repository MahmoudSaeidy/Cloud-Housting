"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import styles from "./header.module.css"
import { FiAlignJustify } from "react-icons/fi";
import { HiOutlineXCircle } from "react-icons/hi2";

interface navbarProps{
  isAdmin : Boolean
}

export const Navbar = ({isAdmin} : navbarProps) => {
  const [toggle , setToggle] = useState(false);

  return (<div>

            <div className={`${styles.navbar}`} style = {{clipPath:toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" || ""}}>
                  <ul className={`${styles.navbarLinks} flex list-none font-bold text-lg m-0 p-0`}>
                  <li>
                    <Link onClick={()=>{setToggle(false)}} className={styles.navLink} href="/">Home</Link>
                  </li>
                  <li>
                    <Link onClick={()=>{setToggle(false)}} className={styles.navLink} href="/articles?pageNumber=1">Article</Link>
                  </li>
                  <li>
                    <Link onClick={()=>{setToggle(false)}} className={styles.navLink} href="/about">About</Link>
                  </li>
                  {isAdmin &&                   
                  <li>
                    <Link onClick={()=>{setToggle(false)}} className={styles.navLink} href="/admin">Admin Dashboard</Link>
                  </li>}

                </ul>
                </div>
                  <div className = {`${styles.menu} text-3xl cursor-pointer`} onClick={()=>{setToggle(prev => !prev)}}>{toggle ? <HiOutlineXCircle /> : <FiAlignJustify />
}</div>
          
  </div>
  )
}

export default Navbar