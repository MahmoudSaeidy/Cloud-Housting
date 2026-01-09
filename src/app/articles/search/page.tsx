import React from 'react';
import { getArticlesBasedOnSearchText } from '@/src/ApiCalls/articlesAPICalls';
import { Article } from '@prisma/client';
import { Articles } from '@/src/components/articles/Articles';
import { SearchArticlesInput } from '@/src/components/articles/SearchArticlesInput';
import { LuSearchX } from "react-icons/lu";


interface SearchArticlesPageProps {
  searchParams: { searchText?: string } | Promise<{ searchText?: string }>;
}

const SearchArticlesPage = async ({ searchParams }: SearchArticlesPageProps) => {
  try {
    const searchparams = await searchParams;
    const searchText: string = searchparams.searchText || '';
    
    const articles: Article[] = await getArticlesBasedOnSearchText(searchText);
    if (articles.length === 0){
      return (
      
      <section className='fix-height px-10'>
        <SearchArticlesInput />
        <div className='mt-40'>
          <LuSearchX className='text-6xl mb-3 flex justify-center mx-auto items-center'/>
          <div className='text-3xl text-center flex justify-center items-center mb-10 font-bold '> There is no article with this name.</div>
        </div>
      </section>
      )
    }
    else{
    return (
      <section className='fix-height'>
        <div className='px-10'>
        <SearchArticlesInput />
        </div>
        <div className='text-2xl m-5 mb-10 font-bold '>Article Based on <span className='font-bold text-3xl text-green-600'>{searchText || 'empty'}</span></div>
  
        <div className='flex flex-wrap gap-5 mb-10 justify-center items-center'>
        {articles.map((item) => {
          return (
              <Articles key={item.id} article={item} />
          );
        })}
        </div>

      </section>
    );
    }


  } catch (error) {
    return (
            <section className='fix-height p-4'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 text-center'>
          <p className='text-red-800 font-bold text-lg mb-2'>
            ⚠️ An error occurred
          </p>
          <p className='text-red-600'>
         The articles could not be loaded. Please try again.
          </p>
          <p className='text-gray-500 text-sm mt-4'>
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </section>
    )
  }
}

export default SearchArticlesPage;