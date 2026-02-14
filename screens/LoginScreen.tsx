
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginScreenProps {
  onLogin: (role: 'citizen' | 'admin') => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const role = (e.currentTarget.elements.namedItem('role') as HTMLSelectElement).value as 'citizen' | 'admin';
    onLogin(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center font-sans">
      <div className="max-w-md w-full mx-auto bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">NEUROROAD™</h1>
          <p className="text-gray-500">Smart City AI Platform</p>
        </div>

        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex justify-center space-x-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${isLogin ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${!isLogin ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Sign Up
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <input type="text" placeholder="Name" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          )}
          <input type="email" placeholder="Email" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="tel" placeholder="Phone" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />

          <div className="flex items-center justify-between">
            <label htmlFor="role" className="text-gray-600">Role:</label>
            <select id="role" name="role" required className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="citizen">Citizen</option>
              <option value="admin">Officer / Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
