import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#5E3EEB] text-white p-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">Welcome to Revetpay</h1>
      <p className="text-lg md:text-xl lg:text-2xl mb-8 text-center max-w-2xl">
        Your simple and secure payment solution for seamless transactions.
      </p>
      <div className="space-x-4">
        <button 
          onClick={handleSignUp}
          className="bg-white text-[#5E3EEB] hover:bg-opacity-90 font-bold py-2 px-6 rounded-full text-lg"
        >
          Sign Up
        </button>
        <button 
          onClick={handleSignIn}
          className="bg-transparent border-2 border-white hover:bg-white hover:text-[#5E3EEB] text-white font-bold py-2 px-6 rounded-full text-lg transition duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Welcome;
