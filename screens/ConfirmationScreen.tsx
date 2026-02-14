
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoadReport } from '../types';

interface ConfirmationScreenProps {
  reports: RoadReport[];
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ reports }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const report = id === 'new' 
    ? reports.sort((a, b) => b.timestamp - a.timestamp)[0] 
    : reports.find(r => r.id === id);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-blue-600 text-white text-center">
      <div className="bg-white/20 p-6 rounded-full mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl font-poppins font-bold mb-3">Report Submitted!</h1>
      <p className="text-blue-100 max-w-sm mb-8">Thank you for making our city safer. Your report has been sent to the NEUROROAD™ command center.</p>
      
      <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl text-slate-800 w-full max-w-sm mb-12">
        <div className="border-b border-slate-200 pb-4 mb-4">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Report ID</p>
          <p className="text-lg font-mono font-bold break-all">{report?.id || 'N/A'}</p>
        </div>
        <div className="flex justify-between items-center text-center">
           <div>
             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Status</p>
             <p className="font-semibold text-blue-600">{report?.status}</p>
           </div>
           <div className="border-l border-slate-200 pl-6 ml-6">
             <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Guardian Points</p>
             <p className="font-bold text-2xl text-green-500">+10</p>
           </div>
        </div>
      </div>

      <button 
        onClick={() => navigate('/')}
        className="w-full max-w-sm bg-white text-blue-600 font-poppins font-semibold py-4 rounded-3xl shadow-lg hover:bg-blue-50 transition-colors"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ConfirmationScreen;
