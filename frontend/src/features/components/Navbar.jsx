import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Compass, BarChart3, Menu, X, Terminal } from 'lucide-react';
import '../../style/navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Array Configuration supporting routing matching dashboard paths
  const navigationRoutes = [
    { name: 'Hero Engine', path: '/Hero', icon: <Compass size={18} /> },
    { name: 'Dashboard', path: '/Dashboard', icon: <LayoutDashboard size={18} /> },
    
  ];

  const handleRouteRedirect = (path) => {
    setIsMobileMenuOpen(false); // Mobile menu auto close upon navigation click
    navigate(path);
  };

  return (
    <nav className="nav-container">
      <div className="nav-content">
        
        {/* Brand System Logo Container */}
        <div className="nav-brand" onClick={() => navigate('/Dashboard')}>
          <Terminal size={20} style={{ color: 'var(--nav-primary)' }} />
          <span>RECALL.AI</span>
        </div>

        {/* Hamburger System Actions Trigger Button */}
        <button 
          className="nav-hamburger-trigger" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation configuration control menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Modular Interactive Fluid Deck Links */}
        <div className={`nav-links-deck ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navigationRoutes.map((route) => {
            // Checks if route path strictly hits the current active location state
            const isActive = location.pathname.toLowerCase() === route.path.toLowerCase();
            return (
              <div
                key={route.path}
                onClick={() => handleRouteRedirect(route.path)}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
              >
                {route.icon}
                <span>{route.name}</span>
              </div>
            );
          })}
        </div>

      </div>
    </nav>
  );
}