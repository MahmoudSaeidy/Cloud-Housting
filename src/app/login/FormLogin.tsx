"use client"
import React from 'react'
import { useState } from 'react'
import {toast} from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import ButtonSpinner from "@/src/components/ButtonSpinner"
import {DOMAIN} from "@/src/utils/constants"


export const FormLogin = () => {
    const router = useRouter()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)

    const formSubmitHandler = async (e:React.FormEvent) =>{
        setLoading(true)
        e.preventDefault()
        if (email == ""){
            toast.error("Please enter your email")
        }
        else if (password == ""){
            toast.error("Please enter your password")
        }
        else{
            try{
                await axios.post(`${DOMAIN}api/users/login` , {email , password})
    
                router.replace("/")
                setLoading(false)
                router.refresh()
                toast.success("Login successfuly")
            }
            catch(error:any){
            if (error.response?.data?.message) {
                setLoading(false)
                toast.error(error.response.data.message)
            } else if (error.message) {
                toast.error(error.message)
                setLoading(false)
            } else {
                toast.error("Login failed. Please try again.")
                setLoading(false)
            }
            }
            
            
        }
        
    }
  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col my-4 w-full'>
        <input value={email} onChange={(e)=>{setEmail(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="email" placeholder='Enter your email'/>
        <input value={password} onChange={(e)=>{setPassword(e.target.value)}} className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3' type="password" placeholder='Enter your password'/>
        <button disabled = {loading} className='block bg-blue-600 text-white text-2xl py-2 cursor-pointer px-3 my-4 rounded-xl'>{loading ? <ButtonSpinner /> : "Login"}</button>
    </form>
  )
}

