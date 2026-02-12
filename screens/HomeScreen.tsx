
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoadReport } from '../types';

interface HomeScreenProps {
  reports: RoadReport[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ reports }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-12 pb-24">
      <header className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, Citizen</h2>
          <p className="text-slate-500">Report damage for a safer city.</p>
        </div>
        <Link to="/admin" className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </Link>
      </header>

      {/* Main CTA */}
      <button 
        onClick={() => navigate('/report')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-8 flex flex-col items-center justify-center space-y-4 shadow-lg shadow-blue-200 transition-all active:scale-95 mb-10"
      >
        <div className="bg-white/20 p-4 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="text-xl font-poppins font-semibold">Report Road Damage</span>
      </button>

      {/* Quick Stats/Links */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        <div className="bg-green-50 p-5 rounded-3xl border border-green-100 flex flex-col items-center text-center">
          <span className="text-green-600 font-bold text-2xl">{reports.filter(r => r.status === 'Fixed').length}</span>
          <span className="text-green-800 text-sm font-medium">Issues Resolved</span>
        </div>
        <div className="bg-orange-50 p-5 rounded-3xl border border-orange-100 flex flex-col items-center text-center">
          <div className="p-2 bg-orange-200 rounded-full mb-1">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <span className="text-orange-800 text-sm font-medium">Emergency Alert</span>
        </div>
      </div>

      {/* History Preview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">My Reports</h3>
          <button className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        
        {reports.length === 0 ? (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400 text-sm">No reports submitted yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-200 flex-shrink-0">
                  {report.photoUrl ? (
                    <img src={report.photoUrl} alt="Report" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-slate-800 truncate">{report.locationName || 'Unknown Location'}</h4>
                  <p className="text-xs text-slate-400">{new Date(report.timestamp).toLocaleDateString()}</p>
                </div>
                <div className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  report.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                  report.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  report.status === 'Fixed' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {report.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomeScreen;
