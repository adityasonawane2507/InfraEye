
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, TrendingUpIcon, EyeIcon, MapIcon } from '@heroicons/react/24/outline';

const LandingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              NEUROROAD™
            </h1>
            <nav>
              <Link to="/login" className="text-base font-medium text-gray-500 hover:text-blue-600 transition-colors">
                Login / Signup
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="text-center py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
            <span className="block">NEUROROAD™</span>
            <span className="block text-blue-600">Software-Defined Smart Road Intelligence for Solapur</span>
          </h2>
          <p className="mt-4 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-6 md:text-2xl md:max-w-3xl">
            AI-powered road monitoring and predictive maintenance for a smarter, safer city.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
            <div className="rounded-md shadow">
              <Link to="/login" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-xl md:px-10 transition-transform transform hover:scale-105">
                Report Road Damage
              </Link>
            </div>
          </div>
        </section>

        {/* Key Problem -> Solution Cards */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-extrabold text-gray-900">The Smart City Solution</h3>
              <p className="mt-2 text-xl text-gray-500">From Hazard to Solution with NEUROROAD™</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-8">
                <h4 className="text-2xl font-bold text-red-500">The Problem</h4>
                <p className="mt-2 text-gray-600">Potholes and road damage lead to accidents, traffic congestion, and increased vehicle maintenance costs. Traditional reporting methods are slow and inefficient.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-8">
                <h4 className="text-2xl font-bold text-green-500">The Solution</h4>
                <p className="mt-2 text-gray-600">NEUROROAD™ uses AI to instantly verify and prioritize citizen-reported issues, enabling predictive repairs and transparent tracking for a safer, more responsive infrastructure.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <p className="mt-2 text-4xl leading-10 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Intelligent Road Management
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our AI-powered platform provides real-time insights to ensure road safety and longevity.
              </p>
            </div>
            <div className="mt-12">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <ShieldCheckIcon className="w-12 h-12 mx-auto text-blue-600" />
                  <h4 className="mt-4 text-xl font-semibold">AI-Verified Reports</h4>
                  <p className="mt-2 text-gray-600">Leverage AI to verify and categorize road damage reports for efficient processing.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <TrendingUpIcon className="w-12 h-12 mx-auto text-orange-500" />
                  <h4 className="mt-4 text-xl font-semibold">Predictive Maintenance</h4>
                  <p className="mt-2 text-gray-600">Our system predicts potential road failures, allowing for proactive repairs.</p>
                </div>
                <div className="text-center p-6 bg-white rounded-lg shadow-md">
                  <EyeIcon className="w-12 h-12 mx-auto text-blue-600" />
                  <h4 className="mt-4 text-xl font-semibold">Enhanced Transparency</h4>
                  <p className="mt-2 text-gray-600">Citizens can track the status of their reports, fostering trust and communication.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-gray-900">How It Works</h3>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-4">
              <div className="text-center">
                <MapIcon className="w-12 h-12 mx-auto text-blue-600" />
                <h4 className="mt-4 text-lg font-medium">1. Report</h4>
                <p className="mt-2 text-base text-gray-500">Citizens report damage via the app.</p>
              </div>
              <div className="text-center">
                <ShieldCheckIcon className="w-12 h-12 mx-auto text-orange-500" />
                <h4 className="mt-4 text-lg font-medium">2. Verify</h4>
                <p className="mt-2 text-base text-gray-500">AI verifies and prioritizes the report.</p>
              </div>
              <div className="text-center">
                <TrendingUpIcon className="w-12 h-12 mx-auto text-blue-600" />
                <h4 className="mt-4 text-lg font-medium">3. Assign</h4>
                <p className="mt-2 text-base text-gray-500">A repair team is assigned.</p>
              </div>
              <div className="text-center">
                <EyeIcon className="w-12 h-12 mx-auto text-green-500" />
                <h4 className="mt-4 text-lg font-medium">4. Resolve</h4>
                <p className="mt-2 text-base text-gray-500">The issue is resolved and the citizen is notified.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left text-base">&copy; 2024 NEUROROAD™. All rights reserved.</p>
          <p className="mt-4 md:mt-0 text-center text-sm text-gray-400">A Smart City Initiative for Solapur</p>
        </div>
      </footer>
    </div>
  );
}
