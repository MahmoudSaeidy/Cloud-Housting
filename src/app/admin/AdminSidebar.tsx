import Link from 'next/link'
import React from 'react'
import { CgMenuGridR } from 'react-icons/cg'
import {MdOutlineArticle} from 'react-icons/md'
import {FaRegComments} from 'react-icons/fa'

const AdminSidebar = () => {
  return (
    <div>
        <Link href={"/admin"} className='flex gap-2 items-center text-2xl my-3 mb-12'>
            <CgMenuGridR />
            <span>Dashboard</span>
        </Link>
        <div className='flex flex-col links gap-5 text-lg'>
            <Link href={"/admin/articles-table?pageNumber=1"} className='transition-all flex items-center gap-3 hover:pl-2 hover:text-gray-300'>
            <MdOutlineArticle />
            <span>Articles Table</span>
            </Link>
            <Link href={"/admin/comment-table"} className='transition-all flex items-center gap-3 hover:pl-2 hover:text-gray-300'>
            <FaRegComments />
            <span>Comments table</span></Link>
        </div>
        
    </div>
  )
}

export default AdminSidebar