'use client'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {DOMAIN} from "@/src/utils/constants"


interface DeleteCommentButtonProps {
  commentId: number;
}
const DeleteCommentButton = ({commentId}:DeleteCommentButtonProps) => {
    const router = useRouter()
    async function DeleteCommentButtonHandler(){
        try{
            if(confirm("you want to delete this comment , are you sure ?")){
            await axios.delete(`${DOMAIN}api/comments/${commentId}`)
            toast.success("Comment Deleted")
            router.refresh()
            }
        }
        catch(error:any){
            toast.error(error?.response?.data?.message || "An error occurred")
        }
        
}
  return (
    <button onClick={()=>{DeleteCommentButtonHandler()}} className='bg-red-600 cursor-pointer text-md text-white font-bold px-3 py-1 rounded-lg'>DELETE</button>
  )
}

export default DeleteCommentButton