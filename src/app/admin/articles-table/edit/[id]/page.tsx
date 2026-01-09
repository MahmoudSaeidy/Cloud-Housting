import React from 'react'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyTokenForPage } from "@/src/utils/verifyToken"
import { Article } from '@prisma/client'
import { getSingleArticle } from '@/src/ApiCalls/articlesAPICalls'
import { ArticleWithComment } from '@/src/utils/types'
import EditArticlesForm from '../EditArticlesForm'


interface EditArticlePageProps{
    params : {id:string}
}

const EditArticlePage = async ({params}:EditArticlePageProps) => {
      const paramsData = await params
      const cookiesStore = await cookies()
      const token = cookiesStore.get("jwtToken")?.value
    
      if (!token) {
        redirect("/")
      }
    
      const payload = verifyTokenForPage(token)
    
      if (!payload?.isAdmin) {
        redirect("/")
      }

      const article:ArticleWithComment = await getSingleArticle(paramsData.id)

  return (
    <section className='fix-height flex items-center justify-center px-5 lg:px-20'>
      <div className=' p-10 bg-white rounded-2xl w-full'>
        <h2 className='text-3xl font-bold mb-4'>Edit Article</h2>
        <EditArticlesForm article={article}/>
      </div>
    </section>
  )
}

export default EditArticlePage