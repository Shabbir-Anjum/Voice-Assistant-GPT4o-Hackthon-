import React, { useState } from 'react';
import {faCircleChevronLeft, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomInput from '../Components/common/CustomInput';
import { useNavigate } from 'react-router-dom';
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate= useNavigate()
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }
  
    try {
      const requestData = {
        file: file,
        question: question,
      };

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        setMessage('File uploaded successfully.');
        setAnswer(responseData.answer); // Assuming the response contains the answer
        console.log('Response Data:', responseData);
      } else {
        setMessage('File upload failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="container p-4 file-upload  flex flex-col gap-6 justify-between items-center">

      <h1 className='heading'>Upload Documents</h1>


      <form onSubmit={handleSubmit} className=' mt-48 m-5 flex flex-col p-2 gap-10 items-center justify-center md:flex-row'>
        <input type="file" accept="application/pdf" onChange={handleFileChange} className='bg-transparent border-2 border-borderColor rounded-xl p-2 w-full'/>
        <button className='text-4xl font-bold text-center' type="submit"><FontAwesomeIcon icon={faFilePdf}/></button>
      </form>
    </div>
  );
};

export default FileUpload;
