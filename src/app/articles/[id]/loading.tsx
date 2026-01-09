import React from 'react'

export function loading() {
  return (
    <div className="fix-height relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 from-purple-50 to-white"></div>
      
      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-100 rounded-full animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-200 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-purple-100 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10">
        {/* Article card skeleton with shine effect */}
        <div className="container mx-auto mt-20 mb-5 px-20 p-20 bg-white/80 backdrop-blur-sm rounded-2xl flex justify-center items-center text-center flex-col w-3/4 relative overflow-hidden shadow-xl">
          {/* Shine effect */}
          <div className="absolute inset-0 -translate-x-full from-transparent via-white/30 to-transparent animate-shine"></div>
          
          {/* Title */}
          <div className="h-12 from-gray-300 to-gray-200 rounded-lg w-2/3 mb-8 animate-pulse"></div>
          
          {/* Content lines */}
          <div className="w-full space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-3/6 mx-auto"></div>
          </div>
          
          {/* Button */}
          <div className="mt-10 h-14 from-purple-300 to-purple-200 rounded-xl w-64 animate-pulse"></div>
        </div>

        {/* Comments section */}
        <div className="w-3/4 mx-auto mt-12">
          {/* Comments title */}
          <div className="h-10 from-gray-300 to-gray-200 rounded w-40 mb-8 animate-pulse"></div>
          
          {/* Comments with staggered animation */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="mx-auto w-3/4 bg-white/80 backdrop-blur-sm px-10 py-6 rounded-2xl shadow-lg animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* User info */}
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                      <div className="h-6 bg-gray-300 rounded w-32"></div>
                    </div>
                    
                    {/* Comment text */}
                    <div className="space-y-3 ml-13">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default loading