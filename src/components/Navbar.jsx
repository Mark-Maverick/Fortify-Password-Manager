import React from 'react'

function Navbar() {
  return (
    <div>
      <div className="nav h-[10vh] flex items-center justify-around bg-zinc-800">
        <div className="logo cursor-pointer">
            <span className=' font-extrabold text-2xl text-green-600'>&lt;</span>
            <span className=' font-extrabold text-2xl text-white'>Fort</span>
            <span className=' font-extrabold text-2xl text-green-600'>ify/&gt;</span>
        </div>
        <button className="github flex items-center justify-center bg-zinc-800 transition-all duration-300 gap-2 py-2 px-3 border-2 hover:invert border-white rounded-full my-2 cursor-pointer">
            <img src="/github.svg" alt="GitHub Logo" className=' w-9'/>
            <p className='text-white'>GitHub</p>
        </button>
      </div>
    </div>
  )
}

export default Navbar
