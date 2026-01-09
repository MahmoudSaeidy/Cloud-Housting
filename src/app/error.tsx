"use client"
import Link from 'next/link'
import React from 'react'

interface ErrorPageProps {
  error : Error;
  reset : () => void;
}

const ErrorPage = ({error , reset}:ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{error.message}</h1>
      <p className="text-gray-600 mb-8">An unexpected error has occurred.</p>
      <div onClick={()=>{reset()}}>Try Again</div>
      <Link 
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go to Home Page
      </Link>
    </div>
  )
}

export default ErrorPage