"use client"
import React from 'react'
import  {useState}  from 'react'
import {toast} from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const AddArticlesForm = () => {
    const router = useRouter()
    const [title , setTitle] = useState("")
    const [description , setDescription] = useState("")
    const formSubmitHandler = async (e:React.FormEvent) =>{
        e.preventDefault()
        if (title == ""){
            toast.error("Please enter the title")
        }
        else if (description == ""){
            toast.error("Please enter the description")
        }
        else{
            try {
                await axios.post("http://localhost:3000/api/articles" , {title , description})
                setTitle("")
                setDescription("")
                toast.success("New article added")
                router.refresh()
            }
            catch(error:any){
                return toast.error(error?.response?.data.message)
            }
        }
        
    }
  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col my-4 w-full'>
        <input value={title} onChange={(e)=>{setTitle(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="text" placeholder='Enter the title'/>
        <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' placeholder='Enter the description'/>
        <button className='block bg-blue-600 text-white text-2xl py-2 cursor-pointer px-3 my-4 rounded-xl'>Create</button>
    </form>
  )
}

export default AddArticlesForm