import React from 'react'
import AddArticlesForm from "./AddArticlesForm"
import type { Metadata } from "next";
import {cookies} from "next/headers"
import { redirect } from 'next/navigation';
import { verifyTokenForPage } from '@/src/utils/verifyToken';

const adminPage = async () => {
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
  return (
    <section className='fix-height w-full'>
      <div className='flex flex-col gap-5 bg-white p-10 rounded-xl mx-auto w-3/4 mt-25'>
      <h1 className='text-4xl font-bold'>Create new article</h1>
        <AddArticlesForm />
      </div>
    </section>
  )
}

export default adminPage

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "This is Admin Dashboard Page",
};