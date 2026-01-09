"use client"
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const SearchArticlesInput = () => {
  const router = useRouter()
  const [searchText, setSearchText] = useState("")
  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchText == "") {
      toast.error("Please enter article name")
    }
    else {
      console.log({ searchText })
      router.replace(`/articles/search?searchText=${searchText}`)
    }
  }
  return (
    <form onSubmit={formSubmitHandler} className='flex my-4 w-full'>
      <input 
        value={searchText}
        onChange={(e) => { setSearchText(e.target.value) }}
        className='bg-white w-full text-md rounded-l-md px-4 focus:border-none focus:outline-none'
        type="search"
        placeholder='Enter article name'
      />
      <button className='block bg-blue-600 text-white text-lg py-3 cursor-pointer px-6 rounded-r-xl font-bold'>
        SEARCH
      </button>
    </form>
  )
}