"use client"

import { CommentWithUser } from '@/src/utils/types'
import React, { useState } from 'react'
import { FaEdit , FaTrash } from 'react-icons/fa'
import { UpdateCommentModale } from './UpdateCommentModale'
import { verifyTokenForPage } from '@/src/utils/verifyToken'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useRouter } from 'next/navigation'

interface commentItemProps {
  comment: CommentWithUser
  userId : Number | undefined
}

const CommentItem = ({ comment , userId}: commentItemProps) => {
  const CommentUserId = comment.userId
  const [open, setOpen] = useState(false)
    const router = useRouter()

  const commentDeleteHandler = async ()=>{
    try{
        if(window.confirm("You want delete this comment , Are You Sure ?")){
            await axios.delete(`http://localhost:3000/api/comments/${comment.id}`)
            router.refresh()
        }


    }
    catch(error:any){
        toast.error(error?.response?.data.message)
    }
  }

  return (
    <>
      <div className='mx-auto w-3/4 bg-white px-10 py-5 rounded-2xl my-5'>
        <div className='flex justify-between w-full'>
          <div>
            <h2 className='text-xl font-bold my-3'>
              {comment.user.name}
            </h2>
            <p>{comment.text}</p>
          </div>

          <p className='text-gray-400'>
            {new Date(comment.createdAt).toDateString()}
          </p>
        </div>

        {Number(CommentUserId) === Number(userId) && (
        <div className='flex justify-end text-2xl'>
            <FaEdit
            onClick={() => setOpen(true)}
            className='text-green-700 m-2 cursor-pointer'
            />
            <FaTrash
            onClick={() => commentDeleteHandler()}
            className='text-red-600 m-2 cursor-pointer' />
        </div>
        )}
</div>
      <UpdateCommentModale
        open={open}
        onClose={() => setOpen(false)}
        commentId={comment.id}
        text = {comment.text}
      />
    </>
  )
}

export default CommentItem
