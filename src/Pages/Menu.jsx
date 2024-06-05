import React from 'react'
import { Link } from 'react-router-dom'
export default function Menu() {
  return (
    <div className='flex flex-col items-center justify-center  px-10 gap-8'>
        <div className='heading'>
          Home
        </div>
        <ul className=' grid bg-transparent w-full  mx-10 font-Roboto text-sm text-center mdx:grid-cols-2 md:grid-cols-3 gap-8'>
  
          <li className='border-[1px] border-borderColor rounded-xl p-3 px-4' ><Link to={'/profile'}>User Profile</Link></li>
          <li className='border-[1px] border-borderColor rounded-xl p-3 px-4'><Link to={'/ChatAssistant'}>Chat Assistant</Link></li>
          <li className='border-[1px] border-borderColor rounded-xl p-3 px-4'><Link>User Guide</Link></li>
          <li className='border-[1px] border-borderColor rounded-xl p-3 px-4'><Link to={'/VoiceAssistant'}>Voice Assistant</Link></li>
          <li className='border-[1px] border-borderColor rounded-xl p-3 px-4'><Link to={'/FunctionSheet'}>Upload Docs</Link></li>
        </ul>
    </div>
  )
}
