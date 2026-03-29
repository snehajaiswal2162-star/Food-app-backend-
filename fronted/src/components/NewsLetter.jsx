import React from 'react'

const NewsLetter = () => {
  return (
        <>           
         <div className='h-[40rem] bg-gradient-to-b from-gray-50 to-white py-12'>
               <div className="w-full bg-white/20 px-2 text-center text-black py-20 flex flex-col items-center justify-center">
                <p className="text-orange-500 font-medium">Get updated</p>
                <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">Subscribe to our newsletter & get the latest news</h1>
                <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-orange-600 text-sm rounded-full h-14 max-w-md w-full">
                    <input type="text" className="bg-transparent outline-none rounded-full px-4 h-full flex-1" placeholder="Enter your email address"/>
                     <button className="shrink-0 mr-2 px-6 py-3 text-sm bg-gradient-to-r from-orange-300 to-orange-500 rounded-full active:scale-95 transition duration-300 text-white">
                        Subscribe now
                    </button>
                </div>
            </div>
         </div>
        </>
    );
}

export default NewsLetter


