
import React from 'react'
import {cookies, headers} from "next/headers"
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/src/utils/verifyToken';
import type { Comment } from '@prisma/client';
import {GetAllComment} from "@/src/ApiCalls/AdminAPICalls"
import DeleteCommentButton from "@/src/app/admin/comment-table/DeleteCommentButton"



export const AdminCommentsPage = async () => {



    const cookiesStore = await cookies()
  const token = cookiesStore.get("jwtToken")?.value
  if (!token){
   return redirect("/")
  }
  const payload = verifyTokenForPage(token)

  const isAdmin = payload?.isAdmin
  if (!isAdmin){
    return redirect("/")
  }


  const comments:Comment[] = await GetAllComment(token)
  return (
    <section className='fix-height flex  flex-col justify-center px-5 lg:px-20'>
      <h1 className='mb-8 text-3xl font-bold text-gray-700'>Comments</h1>
      <table className='table w-full text-left '>
        <thead className='border-t-2 border-b-2 border-gray-500 text-xl'>
          <tr>
            <th className='p-2'>Comment</th>
            <th className='hidden lg:inline-block p-3'>Created At</th>
            <th className=''>Action</th>
          </tr>
        </thead>
        <tbody>
            {comments.map((comment)=>{
              return  (
                <tr key = {comment.id} className='p-3 '>

                  
                  <td>{comment.text}</td>
                  <td className='text-gray-700 p-3 hidden lg:inline-block'>
                    {new Date(comment.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td><DeleteCommentButton commentId = {comment.id} /> </td>
                </tr>
              )
            })}
          </tbody>
      </table>

    </section>
  )
}
export default AdminCommentsPage