import React, { useState } from 'react';
import { UserButton, useAuth } from "@clerk/clerk-react";
import { Link, useLocation } from "react-router-dom";
import { urls } from "../router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const { userId, isLoaded } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="md:h-32 h-24 w-full flex items-center justify-between gap-4 px-8">
      <div>
        <img src="./Eva_white_tranparent_background.svg" alt="error" className="w-60" />
      </div>
      <div className="flex items-center">
        {isLoaded && userId ? (
          <>
            <button
              className="md:hidden text-gray-500 focus:outline-none"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            <div
              className={`${
                menuOpen ? 'block' : 'hidden'
              } transition-all ease-in-out duration-500 animate-movingX  md:flex flex-col md:flex-row absolute md:static top-0 right-0 h-full bg-bodyColor md:bg-transparent shadow-md md:shadow-none  p-2 md:p-0 z-50 w-full md:w-auto`}
            >
              <div className=' absolute top-10  right-10 md:hidden'>
              <button
              className=" text-gray-500 focus:outline-none"
              onClick={toggleMenu}
            >
              <FontAwesomeIcon icon={faXmark}/>
            </button>
                
              </div>
              <div className='flex items-center justify-center  flex-col md:flex-row gap-6 md:gap-0 '>

              
              <Link to={urls.home} className="block md:inline-block text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 md:py-0 px-2">
                Home
              </Link>
              <Link to={urls.profile} className="block md:inline-block text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 md:py-0 px-2">
                User Profile
              </Link>
              <Link to={urls.ChatAssistant} className="block md:inline-block text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 md:py-0 px-2">
                Chat Assistant
              </Link>
              <Link to={urls.VoiceAssistant} className="block md:inline-block text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 md:py-0 px-2">
                Voice Assistant
              </Link>
              <Link to={urls.FunctionSheet} className="block md:inline-block text-sm font-semibold text-gray-500 hover:text-gray-700 py-2 md:py-0 px-2">
                Uplaod Documents
              </Link>
              </div>
            </div>
            {location.pathname === '/profile' && (
              <div className="ml-4">
                <UserButton />
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center">
            <div className="mr-5">
              <Link to={urls.login}>
                <button className="text-sm font-semibold text-gray-500">
                  Login
                </button>
              </Link>
            </div>
            <div>
              <Link to={urls.signUp}>
                <button className="text-sm font-semibold text-gray-500">
                  Signup
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
