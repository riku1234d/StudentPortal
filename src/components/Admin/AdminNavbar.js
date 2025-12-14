import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaBell,
  FaClipboardList,
  FaUsers,
  FaCalendarAlt,
  FaSignOutAlt,
  FaUserTie,
  FaHome,
} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBellHovered, setIsBellHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const getAdminRole = () => {
    if (location.pathname.includes("class-teacher")) return "class-teacher";
    if (location.pathname.includes("bus-manager")) return "bus-manager";
    return "class-teacher";
  };

  const adminRole = getAdminRole();

  const formatAdminRole = (role) => {
    return role === 'class-teacher' ? 'Class Teacher' : 'Bus Manager';
  };

  const handleProfileClick = () => {
    navigate(`/admin/${adminRole}/teacher`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 px-md-4 py-3"
      style={{
        background: 'linear-gradient(90deg, #4361ee, #3f37c9)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: "0 0 20px 20px",
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        transition: 'all 0.5s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle decorative element */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
          zIndex: 1
        }}
      ></div>
      
      <div className="container-fluid" style={{ position: 'relative', zIndex: 2 }}>
        {/* Brand / Logo with gentle animation */}
        <div
          className="navbar-brand fw-bold d-flex align-items-center position-relative"
          style={{
            fontSize: "1.2rem",
            color: '#ffffff',
            letterSpacing: "0.5px",
            overflow: "hidden",
            transition: 'all 0.4s ease',
            cursor: 'pointer'
          }}
          onClick={() => navigate(`/admin/${adminRole}/AdminDashboard`)}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.opacity = '0.95';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.opacity = '1';
          }}
        >
          <div className="sidebar-logo d-flex align-items-center">
            <div className="me-2 me-md-3 d-flex align-items-center justify-content-center" 
                 style={{ 
                   width: '36px', 
                   height: '36px', 
                   borderRadius: '12px', 
                   background: 'rgba(255, 255, 255, 0.12)',
                   backdropFilter: 'blur(8px)',
                   transition: 'all 0.3s ease'
                 }}>
              <FaHome style={{ color: '#ffffff', fontSize: '1.2rem' }} />
            </div>
            <div className="sidebar-logo-content">
              <span className="sidebar-logo-main">GIET</span>
              <span className="sidebar-logo-sub d-none d-sm-inline-block">OnePoint</span>
            </div>
          </div>
        </div>

        {/* Toggler for mobile view with subtle animation */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="adminNavbar"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          style={{ 
            border: 'none', 
            boxShadow: 'none',
            transition: 'all 0.3s ease',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
          }}
        >
          <span 
            className="navbar-toggler-icon" 
            style={{ 
              backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 30 30\'%3e%3cpath stroke=\'rgba%28255, 255, 255, 0.8%29\' stroke-linecap=\'round\' stroke-miterlimit=\'10\' stroke-width=\'2\' d=\'M4 7h22M4 15h22M4 23h22\'/%3e%3c/svg%3e")',
              transition: 'all 0.3s ease'
            }} 
          ></span>
        </button>

        {/* Navbar content with gentle animations */}
        <div 
          className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} 
          id="adminNavbar"
          style={{
            transition: 'all 0.5s ease'
          }}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Dashboard Link */}
            <li className="nav-item">
              <div
                className={`nav-link d-flex align-items-center ${location.pathname.includes('AdminDashboard') ? 'active' : ''}`}
                style={{
                  color: location.pathname.includes('AdminDashboard') ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  margin: '0 4px',
                  padding: '10px 14px',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: location.pathname.includes('AdminDashboard') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(5px)',
                  fontWeight: '500'
                }}
                onClick={() => navigate(`/admin/${adminRole}/AdminDashboard`)}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('AdminDashboard')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('AdminDashboard')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FaHome 
                  className="me-2" 
                  style={{ 
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <span>Dashboard</span>
              </div>
            </li>

            {/* Notice Management */}
            <li className="nav-item">
              <div
                className={`nav-link d-flex align-items-center ${location.pathname.includes('notices') ? 'active' : ''}`}
                style={{
                  color: location.pathname.includes('notices') ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  margin: '0 4px',
                  padding: '10px 14px',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: location.pathname.includes('notices') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(5px)',
                  fontWeight: '500'
                }}
                onClick={() => navigate(`/admin/${adminRole}/notices`)}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('notices')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('notices')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FaClipboardList 
                  className="me-2" 
                  style={{ 
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <span>Notice Management</span>
              </div>
            </li>

            {/* Leave Management */}
            <li className="nav-item">
              <div
                className={`nav-link d-flex align-items-center ${location.pathname.includes('leave') ? 'active' : ''}`}
                style={{
                  color: location.pathname.includes('leave') ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  margin: '0 4px',
                  padding: '10px 14px',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: location.pathname.includes('leave') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(5px)',
                  fontWeight: '500'
                }}
                onClick={() => navigate(`/admin/${adminRole}/leave`)}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('leave')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('leave')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FaUsers 
                  className="me-2" 
                  style={{ 
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <span>Leave Management</span>
              </div>
            </li>

            {/* Holiday Details */}
            <li className="nav-item">
              <div
                className={`nav-link d-flex align-items-center ${location.pathname.includes('holidays') ? 'active' : ''}`}
                style={{
                  color: location.pathname.includes('holidays') ? '#ffffff' : 'rgba(255, 255, 255, 0.85)',
                  transition: "all 0.3s ease",
                  borderRadius: "10px",
                  margin: '0 4px',
                  padding: '10px 14px',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: location.pathname.includes('holidays') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                  backdropFilter: 'blur(5px)',
                  fontWeight: '500'
                }}
                onClick={() => navigate(`/admin/${adminRole}/holidays`)}
                onMouseEnter={(e) => {
                  if (!location.pathname.includes('holidays')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!location.pathname.includes('holidays')) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FaCalendarAlt 
                  className="me-2" 
                  style={{ 
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <span>Holiday Details</span>
              </div>
            </li>
          </ul>

          {/* Right Side Icons */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* Admin Profile */}
            <li className="nav-item me-2 me-md-3">
              <div
                className="d-flex align-items-center"
                style={{
                  color: '#ffffff',
                  cursor: 'pointer',
                  padding: '8px 14px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                onClick={handleProfileClick}
              >
                <div className="d-flex align-items-center justify-content-center me-2" 
                     style={{ 
                       width: '32px', 
                       height: '32px', 
                       borderRadius: '50%', 
                       background: 'rgba(255, 255, 255, 0.12)',
                       backdropFilter: 'blur(8px)',
                       transition: 'all 0.3s ease'
                     }}>
                  <FaUserTie style={{ fontSize: '14px' }} />
                </div>
                <span className="d-none d-md-inline-block" style={{ fontWeight: '500', fontSize: '0.9rem' }}>
                  {formatAdminRole(adminRole)}
                </span>
              </div>
            </li>

            {/* Notification Bell */}
            <li className="nav-item me-2 me-md-3 position-relative">
              <div
                style={{ 
                  cursor: "pointer", 
                  transition: "all 0.3s ease",
                  color: '#ffffff',
                  animation: isBellHovered ? 'gentleGlow 2s infinite' : 'none',
                  padding: '8px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={(e) => {
                  setIsBellHovered(true);
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  setIsBellHovered(false);
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <FaBell size={18} />
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{ 
                    fontSize: "0.65rem", 
                    backgroundColor: '#f87171',
                    color: 'white',
                    padding: '3px 6px',
                    transition: 'all 0.3s ease',
                    animation: isBellHovered ? 'gentleGlow 2s infinite' : 'none',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  3
                </span>
              </div>
            </li>

            {/* Logout Button */}
            <li className="nav-item">
              <div
                className="btn d-flex align-items-center"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  fontSize: '0.9rem',
                  transition: "all 0.3s ease",
                  fontWeight: '500',
                  backdropFilter: 'blur(8px)'
                }}
                onClick={handleLogout}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FaSignOutAlt 
                  className="me-1 me-md-2" 
                  style={{ 
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }} 
                />
                <span className="d-none d-md-inline-block">Logout</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Gentle animation keyframes */}
      <style>
        {`
          @keyframes gentleGlow {
            0% { 
              transform: scale(1); 
              filter: brightness(1);
            }
            50% { 
              transform: scale(1.03); 
              filter: brightness(1.1);
            }
            100% { 
              transform: scale(1); 
              filter: brightness(1);
            }
          }
          
          .sidebar-logo {
            display: flex;
            align-items: center;
          }
          
          .sidebar-logo-content {
            display: flex;
            flex-direction: column;
          }
          
          .sidebar-logo-main {
            font-size: 1.4rem;
            font-weight: 600;
            color: #ffffff;
            line-height: 1;
          }
          
          .sidebar-logo-sub {
            font-size: 0.85rem;
            color: rgba(255, 255, 255, 0.8);
            margin-top: -3px;
            font-weight: 400;
          }
          
          .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 2px;
          }
          
          @media (max-width: 992px) {
            .navbar-nav {
              padding-top: 1rem;
            }
            
            .nav-item {
              margin-bottom: 0.5rem;
            }
            
            .navbar-nav.ms-auto {
              margin-top: 1rem;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 1rem;
            }
            
            .navbar-nav.ms-auto .nav-item {
              width: 100%;
              display: flex;
              justify-content: center;
              margin-bottom: 0.5rem;
            }
            
            .navbar-nav.ms-auto .nav-item:last-child {
              margin-bottom: 0;
            }
            
            .navbar-nav.ms-auto .nav-item:first-child div {
              width: 100%;
              justify-content: center;
            }
            
            .navbar-nav.ms-auto .nav-item:nth-child(2) div {
              justify-content: center;
            }
            
            .navbar-nav.ms-auto .nav-item:last-child div {
              width: 100%;
              justify-content: center;
            }
          }
          
          @media (max-width: 576px) {
            .sidebar-logo-main {
              font-size: 1.2rem;
            }
            
            .sidebar-logo-sub {
              font-size: 0.75rem;
            }
            
            .navbar {
              padding-left: 15px !important;
              padding-right: 15px !important;
            }
            
            .nav-link {
              padding: 8px 12px !important;
            }
            
            .navbar-nav.ms-auto .nav-item {
              margin-bottom: 0.75rem;
            }
          }
        `}
      </style>
    </nav>
  );
}