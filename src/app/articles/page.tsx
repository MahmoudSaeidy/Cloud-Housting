import { Articles } from '@/src/components/articles/Articles'
import React from 'react'
import { Article } from "@prisma/client"
import type { Metadata } from "next";
import { SearchArticlesInput } from '../../components/articles/SearchArticlesInput';
import Pagination from '@/src/components/articles/Pagination';
import {getArticles} from "../../ApiCalls/articlesAPICalls"
import { getCount } from '../../ApiCalls/articlesAPICalls';
import { ARTICLE_PER_PAGE } from '@/src/utils/constants';

interface articlesPageProps{
  searchParams : {pageNumber:string}
}


const ArticlesPage = async ({searchParams} : articlesPageProps) => {
  const {pageNumber} = await searchParams
  const articles:Article[] = await getArticles(pageNumber)
  const count:number = await getCount()

  const pages = Math.ceil(count / ARTICLE_PER_PAGE)

  return (
    <div className="container fix-height mx-auto px-4 mb-15">
      <section className="flex flex-wrap items-center justify-center gap-5 mt-10">
        <SearchArticlesInput />

        {articles.map((item: Article) => (
          <Articles article={item} key={item.id} />
        ))}
        
       {(count && <Pagination pageNumber = {parseInt(pageNumber)} pages = {pages} route = {""} />) || ""}
      </section>
    </div>
  )
}

export default ArticlesPage

export const metadata: Metadata = {
  title: "Articles Page",
  description: "This is Articles Page",
};
