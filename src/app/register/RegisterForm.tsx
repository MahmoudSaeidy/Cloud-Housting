"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import {toast} from 'react-toastify';
import ButtonSpinner from '@/src/components/ButtonSpinner';
import {DOMAIN} from "@/src/utils/constants"


const FormRegister = () => {
    const router = useRouter()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [username , setUserName ] = useState("")
    const [name , setName ] = useState("")
    const [loading , setLoading] = useState(false)

    const formSubmitHandler = async (e:React.FormEvent) =>{
        try{
        
        e.preventDefault()
        if (email == ""){
            toast.error("Please enter your email")
        }
        else if (password == ""){
            toast.error("Please enter your password")
        }
        else if (name == ""){
            toast.error("Please enter your name")
        }
        else if (username == ""){
            toast.error("Please enter your username")
        }
        else{
            setLoading(true)
            await axios.post(`${DOMAIN}api/users/register` , {name , username , email , password})
            setLoading(false)
            router.replace("/")
            router.refresh()
            
        }

        }
        catch(error:any){
                        setLoading(false)
                        if (error.response?.data?.message) {
                            
                            toast.error(error.response.data.message)
                        } else if (error.message) {
                            toast.error(error.message)
                        } else {
                            toast.error("Login failed. Please try again.")
                        }
        }

        
    }
  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col my-4'>
        <input value={name} onChange={(e)=>{setName(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="text" placeholder='Enter your name'/>
        <input value={username} onChange={(e)=>{setUserName(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="text" placeholder='Enter your username'/>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="email" placeholder='Enter your email'/>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="password" placeholder='Enter your password'/>
        <button type='submit' className='block bg-blue-600 text-white text-2xl py-2 cursor-pointer px-3 my-4 rounded-xl'>{loading?<ButtonSpinner /> :"Register"}</button>
    </form>
  )
}

export default FormRegister