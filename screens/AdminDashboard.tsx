
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const sampleAnalyticsData = {
  reportsOverTime: [
    { name: 'Jan', reports: 30 },
    { name: 'Feb', reports: 45 },
    { name: 'Mar', reports: 60 },
    { name: 'Apr', reports: 50 },
    { name: 'May', reports: 70 },
    { name: 'Jun', reports: 85 },
  ],
  repairStatus: [
    { name: 'Pending', count: 25, fill: '#fbbf24' },
    { name: 'In Progress', count: 15, fill: '#3b82f6' },
    { name: 'Fixed', count: 45, fill: '#22c55e' },
  ],
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Officer Dashboard</h1>
          <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Logout
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Total Reports</h3>
            <p className="text-4xl font-bold text-blue-600">85</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Pending</h3>
            <p className="text-4xl font-bold text-yellow-500">25</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">In Progress</h3>
            <p className="text-4xl font-bold text-blue-500">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-600">Completed</h3>
            <p className="text-4xl font-bold text-green-500">45</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Reports Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sampleAnalyticsData.reportsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reports" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Repair Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sampleAnalyticsData.repairStatus} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="count" background={{ fill: '#eee' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Live Damage Map</h3>
          <div className="h-96 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-gray-500">[Map Placeholder]</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
