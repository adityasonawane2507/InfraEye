
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white"></div>
      </div>
      
      <div className="mt-8 text-center">
        <h1 className="text-3xl font-poppins font-bold text-slate-800 tracking-tight">
          Infra<span className="text-blue-600">Eye</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Smart Road Response System</p>
      </div>
      
      <div className="absolute bottom-12 flex space-x-2">
        <div className="w-2 h-2 bg-blue-200 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
      </div>
    </div>
  );
};

export default SplashScreen;
