"use client"

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { redirect, useRouter } from 'next/navigation'
import { ArticleWithComment } from '@/src/utils/types'

interface EditArticlePageProps {
  article: ArticleWithComment
}

const EditArticlesForm = ({ article }: EditArticlePageProps) => {
  const router = useRouter()

  const [title, setTitle] = useState<string>(article?.title || "")
  const [description, setDescription] = useState<string>(article?.description || "")

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() === "") {
      toast.error("Please enter the title")
      return
    }

    if (description.trim() === "") {
      toast.error("Please enter the description")
      return
    }

    try {

      await axios.put(`/api/articles/${article.id.toString()}`, {
        title: title.trim(),
        description: description.trim()
      })
      toast.success("Article Updated")
      router.refresh()
      router.push("/admin/articles-table?pageNumber=1")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred")
    }
  }

  return (
    <form onSubmit={formSubmitHandler} className='flex flex-col my-4 w-full'>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3'
        type="text"
        placeholder='Enter the title'
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='bg-gray-200 rounded-md py-3 px-4 focus:border-none focus:outline-none my-3'
        placeholder='Enter the description'
        rows={6}
      />
      <button
        type="submit"
        className='block bg-green-600 text-white text-2xl py-2 cursor-pointer px-3 my-4 rounded-xl hover:bg-green-700 transition'
      >
        Edit
      </button>
    </form>
  )
}

export default EditArticlesForm
