import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { faCalendar, faComment, faDownload, faEye, faGear, faHeadphones, faMessage, faMicrophone, faSliders, faUser, faUserPlus, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import Loader from '../Components/common/Loader';

  export default function Voice() {



    const [showSection, setShowSection] = useState(null);
    const navigate= useNavigate()
    const [animationData, setAnimationData] = React.useState(null);
    //handleSectionCSS
    const handleSectionClick = (section) => {
    setShowSection(showSection === section ? null : section);
  }; 
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: null, // This will be set later with the fetched JSON data
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  useEffect(() => {
    // Fetch the animation data from the provided URL
    fetch('https://lottie.host/580a86a2-0080-437b-bfb6-e440fbf4509e/ho8Z2t0sOc.json')
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, []);

  if (!animationData) {
    return <Loader/>;
  }
  

  return (
    <div className="h-full container py-12 md:py-0 items-center flex flex-col justify-between overflow-hidden">
      <div className='flex items-center justify-center'>


        <div>
      <Lottie options={{ ...defaultOptions, animationData }} height={400} width={400} />
    </div>


      </div>
      <div className="fixed bottom-0 left-0 w-full px-5">
        <div className="border-t-2 flex justify-around border-2 border-black rounded-3xl p-2 m-2 px-4">
          <button className="text-2xl" onClick={() => handleSectionClick('audio')}>
            <FontAwesomeIcon icon={faVolumeHigh} />
          </button>
          <button className="text-2xl" onClick={() => handleSectionClick('chat')}>
            <FontAwesomeIcon icon={faMessage} />
          </button>
          <button className="text-2xl" onClick={() => handleSectionClick('control')}>
            <FontAwesomeIcon icon={faGear} />
          </button>
        </div>
      </div>

      {showSection === 'audio' && (
        <div className='border w-full animate-movingD container mdx:w-48 gap-2 absolute bottom-16 mdx:left-[19%] bg-bodyColor flex flex-col items-center justify-center rounded-xl p-4 mt-4'>
          <div className='text-center text-textColor font-bold mx-auto p-2 border-b-4 inline-block'>
            Audio Mode
          </div>
          <div>

          
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faHeadphones} />
            <span>Earpiece</span>
          </div>
          <div className="flex items-center gap-7 w-full  justify-start">
            <FontAwesomeIcon  icon={faVolumeHigh} />
            <span>Speaker</span>
          </div>
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faSliders} />
            <span>Volume</span>
          </div>
        </div>
        </div>
      )}

      {showSection === 'chat' && (
        <div className='border w-full animate-movingD container mdx:w-48 gap-2 absolute bottom-16 mdx:right-[38%] bg-bodyColor flex flex-col items-center justify-center rounded-xl p-4 mt-4'>
          <div className='text-center text-textColor font-bold mx-auto p-2 border-b-4 inline-block'>
            Chat
          </div>
          <div className='m'>
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faComment} />
            <span>Team</span>
          </div>
          <div className="flex items-center gap-7 w-full justify-start">
            <FontAwesomeIcon icon={faRocketchat} />
            <span>ChatBot</span>
          </div>
        </div>
        </div>
      )}

      {showSection === 'control' && (
        <div className='border animate-movingD w-full container mdx:w-48 gap-2 absolute bottom-16 mdx:right-[7%] bg-bodyColor flex flex-col items-center justify-center rounded-xl p-4 mt-4'>
          <div className='text-center text-textColor font-bold mx-auto p-2 border-b-4 inline-block'>
            Control
          </div>
          <div>
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faUser} />
            <span>Profile</span>
          </div>
          <div className="flex items-center gap-7 w-full justify-start">
            <FontAwesomeIcon icon={faUserPlus} />
            <span>Invite Staff</span>
          </div>
          <div className="flex items-center gap-7 w-full justify-start">
            <FontAwesomeIcon icon={faEye} />
            <span>Guide</span>
          </div>
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faCalendar} />
            <span>Event</span>
          </div>
          <div className="flex items-center gap-8 w-full justify-start">
            <FontAwesomeIcon icon={faDownload} />
            <span>Download</span>
          </div>
        </div>
        </div>
      )}
  </div>
  )
}

