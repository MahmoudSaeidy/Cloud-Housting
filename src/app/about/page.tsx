import React from 'react'
import Image from "next/image"
import CloudHosting from "../../../public/cloud-hosting.png"
import type { Metadata } from "next";

const AboutPage = () => {
  return (
    <section className='fix-height'>
      <h1 className='text-4xl font-bold p-5 text-gray-600'>About This App</h1>
      <div className='ml-5 text-lg text-gray-600'>the best web hosting solution for your online success </div>
    </section>
  )
}

export default AboutPage

export const metadata: Metadata = {
  title: "About Page",
  description: "This is About Page",
};