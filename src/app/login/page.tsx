import React from 'react'
import {FormLogin} from "./FormLogin"
import type { Metadata } from "next";

const LoginPage = async () => {
  
  return (
    <section className='fix-height'>
      <div className='w-3/4 md:w-1/2 bg-white p-10 rounded-2xl mx-auto my-20'>
      <h1 className='text-2xl md:text-4xl font-bold mb-10'>Login</h1>
        <FormLogin />

      </div>
    </section>
  )
}

export default LoginPage

export const metadata: Metadata = {
  title: "Login Page",
  description: "This is Login Page",
};