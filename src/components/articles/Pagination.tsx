"use client"
import React from 'react'
import Link from 'next/link'

interface PaginationProps {
  pages: number
  route: string
  pageNumber: number
}

const Pagination = ({ pages, route, pageNumber }: PaginationProps) => {
  const pagesArray = Array.from({ length: pages }, (_, i) => i + 1)

  return (
    <div className='flex flex-wrap items-center w-full justify-center gap-2'>

      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${pageNumber - 1}`}
          className="px-3 py-2 text-lg font-bold border border-gray-700 rounded-full hover:bg-purple-800 hover:text-white transition"
        >
          &lt;&lt;
        </Link>
      )}

      {pagesArray.map(page => (
        <Link
          key={page}
          href={`${route}?pageNumber=${page}`}
          className={`px-3 py-2 text-lg font-bold border border-gray-700 rounded-full transition
            ${pageNumber === page ? "bg-purple-800 text-white" : "hover:bg-purple-800 hover:text-white"}
          `}
        >
          {page}
        </Link>
      ))}

      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${pageNumber + 1}`}
          className="px-3 py-2 text-lg font-bold border border-gray-700 rounded-full hover:bg-purple-800 hover:text-white transition"
        >
          &gt;&gt;
        </Link>
      )}

    </div>
  )
}

export default Pagination
