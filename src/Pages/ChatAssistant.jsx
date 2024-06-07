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
    <section className='container flex flex-col justify-between rounded-lg shadow-lg h-screen  box-border md:p-36'>
      <div className='flex flex-col items-center justify-center gap-2'>
        {!isTyping && (
          <div className=' px-16 pb-10 pt-2 border-[1px] border-borderColor rounded-md'>
            <h1 className='text-2xl font-bold py-6'>Hi, I'm your AI event assistant</h1>
            <p>You can ask me any questions related to your event or the event industry.</p>
            <p>I can process tasks for you, such as sending messages, taking notes, and adding tasks to your calendar.</p>
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
        {/* <button
          onClick={() => navigate('/')}
          className="fixed bottom-4 right-6 z-20 flex items-center justify-center bg-[#1a1a1b] text-white p-3 rounded-full shadow hover:bg-transparent transition-colors"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button> */}
      </div>
      <div>
        <div>
          {!isTyping && (
            <div className='grid md:grid-cols-2 p-2 md:p-10 gap-2 md:gap-16'>
              <div className='border1 p-4' onc>
              Provide me an Event briefing ?
              </div>
              <div className='border1 p-4'>
              What is the number of the organizer ?
              </div>
              <div className='border1 p-4 hidden md:block'>
              Give me a list of the staff ?
              </div>
              <div className='border1 p-4 hidden md:block'>
              Who is the security manager on site ?
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
