import { Article } from "@prisma/client"
import {ArticleWithComment} from "@/src/utils/types"

export const getArticles = async (pageNumber: string | undefined): Promise<Article[]> => {
  try {
const response = await fetch(
  `http://localhost:3000/api/articles?pageNumber=${pageNumber || "1"}`,
  { cache: "no-store" ,        next: { 
          tags: ['articles'] 
        }} 
)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || "Error, Try Again Please")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching articles:', error)
    throw error
  }
}

export const getCount = async ():Promise <number>=>{
  const response = await fetch(`http://localhost:3000/api/articles/count`)

  if (!response.ok) {
    throw new Error("Filled to get articles count")
  }

  const {count} = (await response.json()) as {count:number}
  
  return count
}

export const getArticlesBasedOnSearchText = async (searchText:string):Promise <Article[]>=>{
  const response = await fetch(`http://localhost:3000/api/articles/search?searchText=${searchText}`)

  if (!response.ok) {
    throw new Error("Filled to get articles count")
  }

   return await response.json()
}
export const getSingleArticle = async (articleId:string):Promise <ArticleWithComment>=>{
  const response = await fetch(`http://localhost:3000/api/articles/${articleId}`)

  if (!response.ok) {
    throw new Error("Filled to get articles count")
  }

   return await response.json()
}
