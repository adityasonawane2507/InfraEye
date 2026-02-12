
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoadReport, ReportStatus } from '../types';

interface AdminDashboardProps {
  reports: RoadReport[];
  onUpdateStatus: (id: string, status: ReportStatus) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ reports, onUpdateStatus }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filter, setFilter] = useState<ReportStatus | 'All'>('All');

  const filteredReports = filter === 'All' 
    ? reports 
    : reports.filter(r => r.status === filter);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 overflow-hidden">
      <div className="bg-white p-6 pb-2 border-b border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
           <button onClick={() => navigate('/')} className="text-slate-500 hover:text-slate-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
           </button>
           <h2 className="text-xl font-poppins font-bold text-slate-800">Command Center</h2>
           <div className="w-6"></div>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
          <button 
            onClick={() => setView('list')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${view === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Report List
          </button>
          <button 
            onClick={() => setView('map')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${view === 'map' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Live Map
          </button>
        </div>

        <div className="flex overflow-x-auto pb-4 space-x-2 no-scrollbar">
          {['All', 'Pending', 'In Progress', 'Fixed', 'Rejected'].map((status) => (
            <button 
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border ${
                filter === status 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-white text-slate-500 border-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {view === 'list' ? (
          filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8 opacity-50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-2 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p>No active reports in this category.</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div key={report.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="relative aspect-video">
                  {report.photoUrl ? (
                    <img src={report.photoUrl} alt="Issue" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 italic">No image</div>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold shadow-sm">
                    ID: {report.id}
                  </div>
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    {report.voiceUrl && (
                      <button className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{report.locationName}</h4>
                      <p className="text-xs text-slate-400">Lat: {report.latitude.toFixed(4)}, Lng: {report.longitude.toFixed(4)}</p>
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
                  
                  {report.note && (
                    <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-3 rounded-xl italic">"{report.note}"</p>
                  )}
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => onUpdateStatus(report.id, 'In Progress')}
                      className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-bold hover:bg-blue-100"
                    >
                      Process
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(report.id, 'Fixed')}
                      className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl text-xs font-bold hover:bg-green-100"
                    >
                      Resolve
                    </button>
                    <button 
                      onClick={() => onUpdateStatus(report.id, 'Rejected')}
                      className="p-2 text-slate-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="h-full bg-slate-200 rounded-3xl relative overflow-hidden flex items-center justify-center">
            {/* Mock Map View */}
            <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/400/600')] opacity-50 bg-cover bg-center"></div>
            <div className="relative z-10 flex flex-col items-center">
              {filteredReports.map(r => (
                <div 
                  key={r.id} 
                  className="absolute animate-bounce"
                  style={{ top: `${Math.random() * 60 + 20}%`, left: `${Math.random() * 60 + 20}%` }}
                >
                  <div className="bg-red-500 text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              ))}
              <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl max-w-xs border border-slate-200">
                <p className="text-sm font-bold text-slate-800">Map Interface Active</p>
                <p className="text-xs text-slate-500 mt-1">Showing {filteredReports.length} reports in current area.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
