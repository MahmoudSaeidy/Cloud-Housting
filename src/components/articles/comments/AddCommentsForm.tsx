"use client"
import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import {DOMAIN} from "@/src/utils/constants"


interface AddCommentsFormProps {
  articleId: number
}

export const AddCommentsForm =  ({articleId}:AddCommentsFormProps) => {
  const router = useRouter()
  const [comment, setComment] = useState("")
  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()
    if (comment == "") {
      toast.error("Please enter your comment")
    }
    else {
      try{
      await axios.post(`${DOMAIN}api/comments` , {text : comment , articleId:Number(articleId) })
      setComment("")
      router.refresh()
      }
      catch(error:any){
        toast.error(error?.response?.data.message)
      }

    }
  }
  return (
    <form onSubmit={formSubmitHandler} className="flex mx-auto w-3/4 mb-5">
      <input 
        value={comment}
        onChange={(e) => { setComment(e.target.value) }}
        className='bg-white py-4 w-full mx-auto text-md rounded-l-md px-4 focus:border-none focus:outline-none'
        type="text"
        placeholder='Enter your comment'
      />
      <button className=' bg-green-600 text-white text-lg py-3 cursor-pointer px-6 rounded-r-xl font-bold'>
        Comment
      </button>
    </form>
  )
}

export default AddCommentsForm