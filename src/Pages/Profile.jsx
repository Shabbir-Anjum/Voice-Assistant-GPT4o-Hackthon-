import { faCircleChevronLeft, faGear, faIdCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

const navigate= useNavigate()
  return (
    <div className="min-h-screen flex items-center justify-center  p-2">
      <div className="container max-w-screen-lg flex flex-col items-center p-4 font-Roboto gap-8  rounded-lg shadow-md">
        <h1 className="heading text-2xl font-bold">
          User Profile
        </h1>
        <div className="w-full grid md:grid-cols-2 gap-5">
          <div className="flex items-center gap-8 w-full justify-between">
            <div className="text-3xl">
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="border-borderColor rounded-xl border-2 p-2 w-full">
              Upload Image
            </div>
          </div>
          <div className="flex items-center gap-8 w-full justify-center">
            <div className="text-3xl">
              <FontAwesomeIcon icon={faGear} />
            </div>
            <div className="border-borderColor rounded-xl border-2 p-2 px-6 w-full">
              Role
            </div>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <div className="text-3xl">
            <FontAwesomeIcon icon={faIdCard} />
          </div>
          <div className="w-full">
            <textarea
              name="bio"
              id="bio"
              placeholder="Bio"
              rows={10}
              className="w-full font-Roboto bg-transparent border-borderColor border-2 rounded-xl p-2"
            ></textarea>
          </div>
        </div>
        <button
         onClick={()=> navigate('/')}
          className="fixed bottom-5 right-8 z-20 flex items-center justify-center bg-[#1a1a1b] text-white p-3 rounded-full shadow hover:bg-transparent transition-colors"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
      </div>
    </div>
  );
}
