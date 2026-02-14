
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, BellIcon } from '@heroicons/react/24/outline';

const sampleComplaints = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    status: 'In Progress',
    date: '2024-07-28',
  },
  {
    id: '2',
    title: 'Cracked pavement near City Hall',
    status: 'Fixed',
    date: '2024-07-25',
  },
  {
    id: '3',
    title: 'Faded lane markings on Highway 1',
    status: 'Pending',
    date: '2024-07-29',
  },
];

const CitizenDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Citizen Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <BellIcon className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <button className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-transform transform hover:scale-105">
            <PlusCircleIcon className="w-6 h-6 mr-2" />
            Report New Damage
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Your Complaint Status</h2>
          <div className="space-y-4">
            {sampleComplaints.map((complaint) => (
              <div key={complaint.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{complaint.title}</h3>
                  <p className="text-sm text-gray-500">Reported on: {complaint.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  {
                    'Pending': 'bg-yellow-100 text-yellow-800',
                    'In Progress': 'bg-blue-100 text-blue-800',
                    'Fixed': 'bg-green-100 text-green-800',
                  }[complaint.status]
                }`}>
                  {complaint.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
