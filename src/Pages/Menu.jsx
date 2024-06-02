import React from 'react'
import { Link } from 'react-router-dom'
export default function Menu() {
  return (
    <div className='flex flex-col items-center justify-center gap-8'>
        <div className='heading'>
          Home
        </div>
        <ul className=' grid bg-transparent font-Roboto text-2xl text-center md:grid-cols-3 gap-8'>
  
          <li className='border-2 border-borderColor rounded-xl p-3' ><Link to={'/profile'}>User Profile</Link></li>
          <li className='border-2 border-borderColor rounded-xl p-3'><Link to={'/ChatAssistant'}>Chat Assistant</Link></li>
          <li className='border-2 border-borderColor rounded-xl p-3'><Link>User Guide</Link></li>
          <li className='border-2 border-borderColor rounded-xl p-3'><Link to={'/VoiceAssistant'}>Voice Assistant</Link></li>
          <li className='border-2 border-borderColor rounded-xl p-3'><Link to={'/FunctionSheet'}>Upload Docs</Link></li>
        </ul>
    </div>
  )
}
