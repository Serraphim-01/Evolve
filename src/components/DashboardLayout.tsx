import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Swords, ChevronLeft, ChevronRight } from 'lucide-react';

const Sidenav = ({ isCollapsed, toggleSidenav }: { isCollapsed: boolean, toggleSidenav: () => void }) => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/challenges', label: 'Challenges', icon: Swords },
  ];

  return (
    <div className={`sidenav ${isCollapsed ? 'collapsed' : ''}`}>
      <button onClick={toggleSidenav} className="sidenav-toggle">
        {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
      </button>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <item.icon />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidenav = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="dashboard-layout">
      <Sidenav isCollapsed={isCollapsed} toggleSidenav={toggleSidenav} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};
