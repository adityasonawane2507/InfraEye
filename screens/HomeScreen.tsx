
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RoadReport, User } from '../types';

interface HomeScreenProps {
  user: User | null;
  reports: RoadReport[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, reports }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 overflow-y-auto px-6 pt-12 pb-24 bg-slate-50">
      <header className="mb-10 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Hello, {user?.name || 'Road Guardian'}</h1>
          <p className="text-slate-500">Help make Solapur's roads safer.</p>
        </div>
        <Link to="/admin" className="p-2 bg-white rounded-full shadow-sm border border-slate-200 hover:bg-slate-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>
      </header>

      {/* Guardian Stats */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Guardian Stats</h3>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Level 3</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">{user?.roadGuardianStats?.score || 128}</p>
            <p className="text-xs text-slate-500">Score</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-700">#{user?.roadGuardianStats?.rank || 542}</p>
            <p className="text-xs text-slate-500">City Rank</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-700">{reports.length}</p>
            <p className="text-xs text-slate-500">Reports</p>
          </div>
        </div>
      </div>
      
      {/* Main CTA */}
      <button 
        onClick={() => navigate('/report')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-3xl p-6 flex items-center justify-between shadow-lg shadow-blue-200 transition-all active:scale-95 mb-10"
      >
        <div>
          <p className="font-bold text-xl">New Report</p>
          <p className="text-xs opacity-80">Tap to start</p>
        </div>
        <div className="bg-white/20 p-3 rounded-2xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
      </button>

      {/* History Preview */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-slate-800">My Recent Reports</h3>
          <button className="text-blue-600 text-sm font-semibold">View All</button>
        </div>
        
        {reports.length === 0 ? (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-500 text-sm font-medium">You have no active reports.</p>
            <p className="text-slate-400 text-xs mt-1">Reports you file will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
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
