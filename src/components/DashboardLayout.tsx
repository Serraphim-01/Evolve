import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidenav = () => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/challenges', label: 'Challenges' },
  ];

  return (
    <div className="sidenav">
      <h2>Menu</h2>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-layout">
      <Sidenav />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
