import React from 'react'
import { Article } from "@prisma/client"
import Link from 'next/link'

type ArticleItemProps = {
    article: Article
}

export const Articles = ({ article }: ArticleItemProps) => {
    return (
        <div
            key={article.id}
            className='bg-white flex flex-col gap-4 border-2 border-gray-400 p-6 rounded-2xl max-w-sm w-full'>
            <h1 className='text-xl font-bold line-clamp-1'>{article.title}</h1>
            <p className='text-gray-600 line-clamp-3'>{article.description}</p>
            <Link href={`/articles/${article.id}`} className='text-white bg-purple-800 hover:bg-purple-600 font-bold block cursor-pointer py-3 px-6 rounded-2xl transition-colors text-center'>
                Read More
            </Link>
        </div>
    )
}
