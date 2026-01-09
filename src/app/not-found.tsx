import Link from 'next/link'
import React from 'react'

export const NotFoundPage = () => {
  return (
    <div className='fix-height'>
    <div>Not Found Page</div>
    <Link href="./" >Go To Home</Link>
    </div>
  )
}

export default NotFoundPage