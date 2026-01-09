import React from 'react'

const loading = () => {
  return (
    <div className="container mx-auto px-4 mb-15">
      <section className="flex flex-wrap items-center justify-center gap-5 mt-10">


        <div className="flex my-4 w-full">
          <div className="bg-gray-300 w-full h-12 rounded-l-md"></div>
          <div className="bg-gray-400 h-12 w-24 rounded-r-xl"></div>
        </div>

        {[1, 2, 3, 4, 5, 6].map((article) => (
          <div 
            key={article}
            className="bg-gray-200 p-6 rounded-lg w-full max-w-sm h-64 animate-pulse"
          >
            <div className="bg-gray-300 h-6 w-3/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-4 w-full mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-5/6 mb-2 rounded"></div>
            <div className="bg-gray-300 h-4 w-4/6 rounded"></div>
          </div>
        ))}


        <div className="flex items-center w-full justify-center mt-8">
          <div className="bg-gray-300 px-4 py-2 h-10 w-16 rounded-full mr-2"></div>
          {[1, 2, 3, 4, 5].map((page) => (
            <div 
              key={page}
              className="bg-gray-300 px-4 py-2 h-10 w-10 rounded-full mx-1"
            ></div>
          ))}
          <div className="bg-gray-300 px-4 py-2 h-10 w-16 rounded-full ml-2"></div>
        </div>
      </section>
    </div>
  )
}

export default loading