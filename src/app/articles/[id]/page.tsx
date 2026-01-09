import React from 'react'
import { Article } from '@/src/utils/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AddCommentsForm from "../../../components/articles/comments/AddCommentsForm"
import CommentItem from '@/src/components/articles/comments/CommentItem'
import axios from 'axios'
import {ArticleWithComment} from "@/src/utils/types"
import {CommentWithUser} from "@/src/utils/types"
import {cookies} from "next/headers"
import { verifyTokenForPage } from '@/src/utils/verifyToken'
import CommentsClient from "@/src/components/articles/comments/CommentsClient"



interface SingleArticleProps {
  
  params: Promise<{ id: string }>
}

export default async function SingleArticlePage({ params }: SingleArticleProps) {
  const cookieStore = await cookies()
  const token = cookieStore.get("jwtToken")?.value || ""
  const payload = verifyTokenForPage(token)
  try {

    const { id } = await params
    const articleNum = parseInt(id)
    const response = await fetch(`http://localhost:3000/api/articles/${id}`)
    if (!response.ok) {
      notFound()
    }
    const article: ArticleWithComment = await response.json()
    return (
      <div className='fix-height mb-15'>
        <div className="container mx-auto mt-20 mb-5 px-20 p-20 bg-white rounded-2xl flex justify-center items-center text-center flex-col w-3/4">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-700">{article.description}</p>
          <Link href={"/articles"} className='bg-purple-800 py-3 px-6 text-white font-bold cursor-pointer rounded-xl my-5'>Return to the articles page</Link>
        </div>
        {payload && payload.id ? <AddCommentsForm articleId={articleNum} /> : null}
        <h4 className='flex mx-auto text-3xl font-bold w-3/4 '>Comments :</h4>
      <CommentsClient comments={article.comments} userId={payload?.id ? Number(payload.id) : undefined} />
        
      </div>
    )

  } catch (error) {
    console.error('Error:', error)
    notFound()
  }
}