
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import ReportScreen from './screens/ReportScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import AdminDashboard from './screens/AdminDashboard';
import LoginScreen from './screens/LoginScreen';
import { RoadReport } from './types';

const AppContent: React.FC = () => {
  const [isAppReady, setIsAppReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for auth status in localStorage
    return window.localStorage.getItem('isAuthenticated') === 'true';
  });
  const [reports, setReports] = useState<RoadReport[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Persist auth status in localStorage
  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', isAuthenticated.toString());
  }, [isAuthenticated]);

  const addReport = (report: RoadReport) => {
    setReports(prev => [report, ...prev]);
  };

  const updateReportStatus = (id: string, status: RoadReport['status']) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  if (!isAppReady) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={!isAuthenticated ? <LoginScreen onLogin={() => setIsAuthenticated(true)} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/" 
        element={isAuthenticated ? <HomeScreen reports={reports} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/report" 
        element={isAuthenticated ? <ReportScreen onAddReport={addReport} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/confirmation/:id" 
        element={isAuthenticated ? <ConfirmationScreen reports={reports} /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin" 
        element={isAuthenticated ? <AdminDashboard reports={reports} onUpdateStatus={updateReportStatus} /> : <Navigate to="/login" />} 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen max-w-md mx-auto bg-white shadow-xl relative overflow-hidden flex flex-col">
        <AppContent />
      </div>
    </HashRouter>
  );
};

export default App;
