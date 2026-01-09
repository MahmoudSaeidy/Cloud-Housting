'use client'
import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import {DOMAIN} from "@/src/utils/constants"

interface DeleteArticleProps{
    articleId:number
}

const DeleteArticleButton = ({articleId}:DeleteArticleProps) => {
    const router = useRouter()
    const deleteArticleHandler = async () =>{
    try {
        if(confirm("you want delete this article , Are you sure ?")){
            await axios.delete(`${DOMAIN}articles/${articleId}`)
            router.refresh()
            toast.success("Article deleted")

        }
    } 
    catch(error:any){
        toast.error(error?.response?.data.message)
    }
    }
  return (
    <div onClick={deleteArticleHandler} className='p-2 bg-red-600 text-white w-fit rounded-lg font-bold cursor-pointer'>Delete</div>
  )
}

export default DeleteArticleButton