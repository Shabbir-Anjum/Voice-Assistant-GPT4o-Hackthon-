import React, { useState, useRef, useEffect } from 'react';
import CustomInput from '../Components/common/CustomInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faArrowTurnUp } from '@fortawesome/free-solid-svg-icons/faArrowTurnUp';

export default function ChatAssistant() {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null); // Reference for messages container
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setChat(e.target.value);
    if (e.target.value.trim() && !isTyping) {
      setIsTyping(true);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default behavior (form submission)
      // Call handleSubmit function
      handleSubmit();
    }
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

    scrollToBottom();
  };

  return (
    <section className='container flex flex-col justify-between rounded-lg shadow-lg  box-border h-screen p-36'>
      <div className='flex flex-col items-center justify-center gap-16 py-2'>
        {!isTyping && (
          <div className='p-5 border-[1px] border-borderColor rounded-md'>
            <h1 className='text-2xl font-bold py-8'>Welcome to AI Chatbot!</h1>
            <p>This is an open source AI chatbot app template built with React.js.</p>
            <p>It uses React Server Components to combine text with generative UI as output of the LLM. The UI state is synced through the SDK so the model is aware of your interactions as they happen.</p>
          </div>
        )}
        <div className='w-full' style={{ overflowY: 'auto' }}>
          <div className='chat-content bg-transparent p-4 rounded-lg shadow-lg'>
            <div className='flex flex-col gap-2'>
              {messages.map((message, index) => (
                <div key={index} className={`flex items-start ${message.sender === 'user' ? 'justify-end' : 'justify-start'} gap-2`}>
                     {message.sender === 'bot' && (
                    <img src='../icon.png' alt="Chatbot" className="w-8 h-8 rounded-full" />
                  )}
                  <div className={`p-2 max-w-xs ${message.sender === 'user' ? 'self-end bg-transparent' : 'self-start bg-transparent'}`}>
                    {message.text}
                  </div>
                  {message.sender === 'user' && (
                    <img src='../gpt-3-bot-cover.png' alt="User" className="w-8 h-8 rounded-full" />
                  )}
                </div>
              ))}
              {/* Ref for scrolling to bottom */}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        <button
          onClick={() => navigate('/')}
          className="fixed bottom-5 right-8 z-20 flex items-center justify-center bg-[#1a1a1b] text-white p-3 rounded-full shadow hover:bg-transparent transition-colors"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
      </div>
      <div>
        <div>
          {!isTyping && (
            <div className='grid md:grid-cols-2 p-4 md:p-10 gap-4 md:gap-16'>
              <div className='border1 p-4'>
                This is an open source AI chatbot app template built with React.js.
              </div>
              <div className='border1 p-4'>
                This is an open source AI chatbot app template built with React.js.
              </div>
              <div className='border1 p-4 hidden md:block'>
                This is an open source AI chatbot app template built with React.js.
              </div>
              <div className='border1 p-4 hidden md:block'>
                This is an open source AI chatbot app template built with React.js.
              </div>
            </div>
          )}
          <div className='rounded-lg shadow-lg p-4 flex gap-2 items-center'>
            <CustomInput
              value={chat}
              onChange={handleInputChange}
              placeholder='Send a message'
              onKeyPress={handleKeyPress}
            />
            <div>
              <button onClick={handleSubmit}>
                <FontAwesomeIcon className='ml-2 bg-[#1a1a1b] rounded-lg shadow-lg text-textColor py-3 px-4' icon={faArrowTurnUp} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
