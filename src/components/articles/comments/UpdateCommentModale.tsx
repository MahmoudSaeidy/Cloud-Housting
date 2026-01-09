"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify"
import axios from 'axios'
import { IoMdCloseCircleOutline } from "react-icons/io"
import {DOMAIN} from "@/src/utils/constants"


interface UpdateCommentModaleProps {
  open: boolean
  onClose: () => void
  commentId?: number | null
  text: string
}

export const UpdateCommentModale = ({ open, onClose, commentId, text }: UpdateCommentModaleProps) => {
  const router = useRouter()
  const [commentText, setCommentText] = useState(text)
  const [loading, setLoading] = useState(false)

  // تحديث النص عند فتح المودال لأي تعليق جديد
  useEffect(() => {
    setCommentText(text)
  }, [text])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!commentId) return toast.error("No comment selected")
    if (!commentText.trim()) return toast.info("Please write something")

    try {
      setLoading(true)
      await axios.put(`${DOMAIN}api/comments/${commentId}`, {
        text: commentText
      })
      toast.success("Comment updated successfully")
      onClose()
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update comment")
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className='top-0 bottom-0 left-0 right-0 bg-black/40 z-50 fixed flex justify-center items-center'>
      <div className='bg-white w-11/12 lg:w-1/2 rounded-2xl p-10'>
        <div className='flex justify-between items-center mb-6'>
          <div className='text-lg lg:text-3xl font-bold'>Update Your Comment</div>
          <IoMdCloseCircleOutline 
            className='text-3xl cursor-pointer text-red-700 hover:text-red-800 transition-colors' 
            onClick={onClose}
            title="Close"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <input 
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder='Enter your new comment' 
            className='mb-6 text-md lg:text-xl rounded-lg p-3 w-full bg-gray-200 border-none outline-none focus:ring-2 focus:ring-green-500'
          />
          <button 
            type="submit" 
            disabled={loading}
            className='w-full rounded-xl font-bold cursor-pointer p-4 text-center bg-green-700 text-white text-md lg:text-xl hover:bg-green-800 disabled:bg-gray-400 transition-colors'
          >
            {loading ? "Updating..." : "Update Comment"}
          </button>
        </form>
      </div>
    </div>
  )
}
