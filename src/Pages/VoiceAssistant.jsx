import { Link } from 'react-router-dom'
import { urls } from '../router'
import React, { useEffect, useState } from 'react';
export default function VoiceAssistant() {
    const [audioSocket, setAudioSocket] = useState(null);
    let mediaRecorder;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
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
    <>
      <div className=' flex flex-col gap-10 items-center justify-center mt-36 px-6 md:px-20'>
        <div>
        Meet our AI voice Assistant.
        </div>
        <div>
          <Link to={urls.Voice} className=' bg-buttonBg p-4 px-8 font-OpenSans font-bold rounded-2xl'>Start Conversation</Link>
        </div>
        <div>
        By starting a conversation, I accept Hume's Terms of Use and acknowledge the Privacy Policy
        </div>
      </div>
     
    </>
  )
}
