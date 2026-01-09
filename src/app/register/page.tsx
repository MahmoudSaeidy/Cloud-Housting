import React from 'react'
import FormRegister from "./RegisterForm"
import type { Metadata } from "next";

const RegisterPage = async () => {
  return (
        <section className='fix-height'>
      <div className='w-3/4 md:w-1/2 bg-white p-10 rounded-2xl mx-auto my-20'>
      <h1 className='text-2xl md:text-4xl font-bold mb-10'>Creat New Account</h1>
        <FormRegister />
      
      </div>
    </section>
  )
}

export default RegisterPage

export const metadata: Metadata = {
  title: "Register Page",
  description: "This is Register Page",
};