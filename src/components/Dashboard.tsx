import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { logout } = useAuth();
  const defaultUser = {
    username: 'Default User',
    email: 'default@example.com',
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {defaultUser.username}!</p>
      <p>Email: {defaultUser.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
