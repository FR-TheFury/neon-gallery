
import React from 'react';

const CheaterPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-bold text-neon-red animate-pulse-neon mb-8">
          YOU'R A CHEATER
        </h1>
        <div className="text-2xl text-white animate-pulse">
          🚫 Access Denied 🚫
        </div>
        <div className="mt-8 text-lg text-gray-400">
          Nice try, but you need to earn your way in...
        </div>
      </div>
    </div>
  );
};

export default CheaterPage;
