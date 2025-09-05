import React from 'react';

export const Dashboard = () => {
  const defaultUser = {
    username: 'Default User',
    email: 'default@example.com',
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {defaultUser.username}!</p>
      <p>Email: {defaultUser.email}</p>
    </div>
  );
};
