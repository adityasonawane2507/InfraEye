
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RoadReport } from '../types';

interface ConfirmationScreenProps {
  reports: RoadReport[];
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ reports }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const report = reports.find(r => r.id === id);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-green-100 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h2 className="text-3xl font-poppins font-bold text-slate-800 mb-2">Report Submitted!</h2>
      <p className="text-slate-500 mb-8 max-w-xs mx-auto">
        Your report has been successfully logged. Municipal officers will be alerted immediately.
      </p>

      <div className="w-full bg-slate-50 rounded-3xl p-6 mb-10 border border-slate-100 text-left">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Report ID</span>
          <span className="text-blue-600 font-mono font-bold">#{id}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Status</span>
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-lg text-xs font-bold uppercase">Pending Review</span>
        </div>
        <div className="border-t border-slate-200 pt-4 mt-2">
           <p className="text-xs text-slate-400 leading-relaxed">
             You can track the status of this report from your dashboard. Most repairs take 3-5 business days.
           </p>
        </div>
      </div>

      <div className="w-full space-y-4">
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-slate-800 text-white py-4 rounded-3xl font-poppins font-semibold shadow-lg active:scale-95 transition-all"
        >
          Back to Dashboard
        </button>
        <button 
           onClick={() => navigate('/report')}
           className="w-full text-blue-600 py-4 font-semibold hover:bg-blue-50 rounded-3xl transition-all"
        >
          Report Another Issue
        </button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
