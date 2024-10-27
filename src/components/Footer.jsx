import React from 'react'

function Footer() {
  return (
    <div>
      <div className="w-full h-[10vh] bg-zinc-800 text-white flex items-center justify-center flex-col">
      <div className="logo cursor-pointer">
            <span className=' font-extrabold text-xl text-green-600'>&lt;</span>
            <span className=' font-extrabold text-xl text-white'>Fort</span>
            <span className=' font-extrabold text-xl text-green-600'>ify/&gt;</span>
        </div>
        <div className='flex items-center justify-center'>Made With <p className='text-2xl'>💖</p>by<p className='font-extrabold'> Mark Maverick</p></div>
      </div>
    </div>
  )
}

export default Footer
