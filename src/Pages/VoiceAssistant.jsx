import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import {faCircleChevronLeft, faCalendar, faComment, faDownload, faEye, faGear, faHeadphones, faMessage, faMicrophone, faSliders, faUser, faUserPlus, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


  export default function VoiceAssistant() {


    const [audioSocket, setAudioSocket] = useState(null);
    let mediaRecorder;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const [showSection, setShowSection] = useState(null);
    const navigate= useNavigate()

    //handleSectionCSS
    const handleSectionClick = (section) => {
    setShowSection(showSection === section ? null : section);
  }; 
    const enqueueAudio = (arrayBuffer) => {
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
      });
    };
  

    const initAudioWebSocket = () => {
      //const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_SERVICE}/ws/audio/132`);
      const ws = new WebSocket('ws://127.0.0.1:8000/ws/audio/132');
      ws.onopen = () => {
        console.log('WebSocket connection established');
      };
  
      ws.onmessage = async event => {
        const arrayBuffer = await event.data.arrayBuffer();
        console.log("arrayBuffer", arrayBuffer)
        enqueueAudio(arrayBuffer);
      };
  
      ws.onerror = error => {
        console.error('WebSocket error:', error);
      };
  
      ws.onclose = (event) => {
        console.log('WebSocket connection closed', event);
      };
      setAudioSocket(ws);
    };
  
    // Add useEffect hook to initialize the audio socket on component mount
    useEffect(() => {
      initAudioWebSocket();
    }, []);
  
    // Add useEffect hook to close the audio socket on component unmount
    useEffect(() => {
      return () => {
        if (audioSocket) {
          audioSocket.close();
        }
      }
    }, [audioSocket]);
  
    const handleMicrophoneClick = async () => {
      if (audioSocket  && typeof mediaRecorder !== 'undefined') {
        // && typeof mediaRecorder !== 'undefined'
        // Stop recording and close the WebSocket connection
        mediaRecorder.stop();
        audioSocket.close();
        setAudioSocket(null);
      } else {
        // Start a new WebSocket connection
        // initAudioWebSocket();
    
        // Access the user's microphone
  
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: true })
        const audioStream = new MediaStream(stream.getAudioTracks())
        const recorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' })
        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            console.log(audioSocket, audioSocket.readyState)
            if (audioSocket && audioSocket.readyState === WebSocket.OPEN) {
              console.log(event)
              const audioBlob = new Blob([event.data], { type: 'audio/wav' })
              audioSocket.send(audioBlob)
            }
          }
        }
    
        recorder.onstop = () => {}
    
        recorder.start(1000 * 1)
      }
    };
  
  return (
    <div className="h-full container py-12 md:py-0 items-center flex flex-col justify-between overflow-hidden">
      <div className='flex items-center justify-center'>

        {/* Microphone add code*/}

        <button className='p-2 bg-[#1a1a1b] rounded-full' onClick={handleMicrophoneClick}>
          <FontAwesomeIcon className='p-16  text-3xl border-yellow-500 border-2 rounded-full' icon={faMicrophone} />
        </button>


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
        <button
         onClick={()=> navigate('/')}
          className="fixed bottom-4 right-12 z-20 flex items-center justify-center bg-[#1a1a1b] text-white p-3 rounded-full shadow hover:bg-transparent transition-colors"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} /> 
        </button>
  </div>
  )
}
