
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import AdminDashboard from './screens/AdminDashboard';
import CitizenDashboard from './screens/CitizenDashboard';

const App: React.FC = () => {
  // In a real app, you would have a state for authentication
  // and user roles. For this prototype, we'll use a simple mock.
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [userRole, setUserRole] = React.useState<'citizen' | 'admin'>('citizen');

  // Mock login function
  const handleLogin = (role: 'citizen' | 'admin') => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? (
              userRole === 'admin' ? (
                <AdminDashboard />
              ) : (
                <CitizenDashboard />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        {/* Redirect any other path to the landing page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
