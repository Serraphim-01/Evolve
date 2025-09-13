import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Layout/Navbar';
import { Login } from './components/Auth/Login';
import { Signup } from './components/Auth/Signup';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Profile } from './components/Profile/Profile';
import { Settings } from './components/Settings/Settings';
import { Chat } from './components/Chat/Chat';
import { CreateMission } from './components/CreateMission/CreateMission';
import { MissionSolver } from './components/MissionSolver/MissionSolver';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path="/signup" element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <Dashboard />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <Profile />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <Settings />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <Chat />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/create-mission" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <CreateMission />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/mission/:id" element={
          <ProtectedRoute>
            <div className="flex">
              <Navbar />
              <MissionSolver />
            </div>
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="bg-black min-h-screen">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;