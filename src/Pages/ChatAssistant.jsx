import React, { useState } from 'react';
import CustomInput from '../Components/common/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleChevronLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
export default function ChatAssistant() {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate= useNavigate()
  const handleInputChange = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = async () => {
    if (!chat.trim()) return;

    // Add user message to messages array
    setMessages([...messages, { text: chat, sender: 'user' }]);
    setChat('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: chat }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setMessages([...messages, { text: chat, sender: 'user' }, { text: data.answer, sender: 'bot' }]);
    } catch (error) {
      setMessages([...messages, { text: chat, sender: 'user' }, { text: 'Error fetching data from the backend', sender: 'bot' }]);
    }
  };

  return (
    <div className='flex flex-col items-center container justify-center gap-8 p-4 md:px-32 lg:px-48 '>
      <div className='heading text-2xl font-bold'>
      Chat Assistant
      </div>
      <div className='w-full'>
        <div className='chat-content bg-transparent p-4 rounded-lg shadow-lg'>
          <div className='flex flex-col gap-2'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg shadow-lg max-w-xs ${message.sender === 'user' ? 'self-end bg-transparent ' : 'self-start bg-transparent '}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className='flex mt-4'>
            <CustomInput
              value={chat}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSubmit}
      
            >
              <FontAwesomeIcon     className=' ml-2 bg-[#1a1a1b] rounded-full  text-textColor font-bold  p-3'  icon={faArrowUp}/>
            </button>
          </div>
        </div>
      </div>
      <button
         onClick={()=> navigate('/')}
          className="fixed bottom-5 right-8 z-20 flex items-center justify-center bg-[#1a1a1b] text-white p-3 rounded-full shadow hover:bg-transparent transition-colors"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} /> 
        </button>
    </div>
  );
}
