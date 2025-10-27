import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const NavItem = ({ to, children, icon }) => {
    const active = pathname === to;
    return (
      <li className="nav-item">
        <Link
          to={to}
          className={`nav-link ${active ? "active" : ""}`}
          onClick={() => setOpen(false)}
        >
          <span className="nav-icon">{icon}</span>
          <span className="nav-text">{children}</span>
        </Link>
      </li>
    );
  };

  // Handle navigation to Student Details
  const handleStudentDetailsClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/student-details');
    setOpen(false);
  };

  // Handle avatar click to navigate to Student Details
  const handleAvatarClick = () => {
    navigate('/student-details');
    setOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container-fluid">
        {/* Logo Section - GIET OnePoint */}
        <Link to="/dashboard" className="navbar-brand">
          <div className="logo-container">
            <div className="logo-content">
              <span className="logo-main">GIET</span>
              <span className="logo-sub">OnePoint</span>
            </div>
            <div className="logo-accent"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse d-none d-lg-flex">
          <ul className="navbar-nav mx-auto">
            {/* Dashboard Link - Added as first item */}
            <NavItem to="/dashboard" icon={<i className="fas fa-tachometer-alt"></i>}>
              Dashboard
            </NavItem>
            <NavItem to="/leaveform" icon={<i className="fas fa-file-alt"></i>}>
              Leave Form
            </NavItem>
            <NavItem to="/complaint" icon={<i className="fas fa-comment-dots"></i>}>
              Complaint Box
            </NavItem>
            <NavItem to="/notice" icon={<i className="fas fa-bullhorn"></i>}>
              Notice Board
            </NavItem>
            <NavItem to="/bustiming" icon={<i className="fas fa-bus"></i>}>
              Bus Timing
            </NavItem>
          </ul>
          
          {/* Simplified User Section - Updated with direct link */}
          <div className="user-profile-section">
            <Link to="/student-details" className="user-icon-btn">
              <i className="fas fa-user-circle"></i>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      {/* Enhanced Mobile Sidebar */}
      <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-content">
              <span className="sidebar-logo-main">GIET</span>
              <span className="sidebar-logo-sub">OnePoint</span>
            </div>
          </div>
          <button 
            className="sidebar-close"
            onClick={() => setOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="sidebar-user">
          {/* Made the avatar clickable */}
          <div 
            className="sidebar-user-avatar-container"
            onClick={handleAvatarClick}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={user?.rollno 
                ? `https://gietuerp.in/StudentDocuments/${user.rollno}/${user.rollno}.JPG`
                : "https://via.placeholder.com/40"}
              alt="User"
              className="sidebar-user-avatar"
            />
          </div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-meta">
              <span>{user?.rollno || 'Student'}</span>
              <span className="sidebar-user-status">Online</span>
            </div>
          </div>
        </div>
        
        <div className="sidebar-menu">
          <ul className="sidebar-nav">
            {/* Dashboard Link - Added as first item */}
            <NavItem to="/dashboard" icon={<i className="fas fa-tachometer-alt"></i>}>
              Dashboard
            </NavItem>
            <NavItem to="/leaveform" icon={<i className="fas fa-file-alt"></i>}>
              Leave Form
            </NavItem>
            <NavItem to="/complaint" icon={<i className="fas fa-comment-dots"></i>}>
              Complaint Box
            </NavItem>
            <NavItem to="/notice" icon={<i className="fas fa-bullhorn"></i>}>
              Notice Board
            </NavItem>
            <NavItem to="/bustiming" icon={<i className="fas fa-bus"></i>}>
              Bus Timing
            </NavItem>
            <NavItem to="/student-details" icon={<i className="fas fa-user-graduate"></i>}>
              Student Details
            </NavItem>
          </ul>
          
          <div className="sidebar-logout">
            <Link className="sidebar-logout-btn" to="/logout">
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {open && (
        <div 
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Font Awesome Icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

      {/* CSS */}
      <style jsx>{`
        .navbar {
          background: linear-gradient(90deg, #4361ee, #3f37c9);
          box-shadow: 0 4px 20px rgba(26, 58, 95, 0.3);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.5rem 0;
        }
        
        .navbar-brand {
          padding: 0;
          transition: none !important;
        }
        
        .navbar-brand:hover {
          transform: none !important;
        }
        
        /* Logo Styles - GIET OnePoint */
        .logo-container {
          display: flex;
          align-items: center;
          position: relative;
        }
        
        .logo-content {
          display: flex;
          flex-direction: column;
          margin-right: 10px;
        }
        
        .logo-main {
          font-weight: 800;
          font-size: 26px;
          color: white;
          letter-spacing: 1px;
          text-transform: uppercase;
          line-height: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          font-family: 'Montserrat', sans-serif;
        }
        
        .logo-sub {
          font-weight: 600;
          font-size: 13px;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 2px;
          font-family: 'Montserrat', sans-serif;
        }
        
        .logo-accent {
          width: 4px;
          height: 32px;
          background: linear-gradient(to bottom, #ffffff, #4fd1c5);
          border-radius: 2px;
          margin-left: 10px;
          box-shadow: 0 0 10px rgba(79, 209, 197, 0.5);
        }
        
        /* Prevent any changes to logo elements on hover */
        .logo-main:hover,
        .logo-sub:hover,
        .logo-accent:hover,
        .logo-container:hover {
          color: inherit !important;
          background: inherit !important;
          transform: none !important;
        }
        
        .nav-link {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 12px 20px !important;
          margin: 0 5px;
          border-radius: 10px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
        }
        
        .nav-link:hover {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.12);
          transform: translateY(-2px);
        }
        
        .nav-link.active {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-left: 3px solid #4fd1c5;
        }
        
        .nav-icon {
          margin-right: 10px;
          width: 20px;
          text-align: center;
          color: #4fd1c5;
        }
        
        .nav-text {
          font-weight: 500;
        }
        
        /* Simplified User Section */
        .user-profile-section {
          margin-left: 20px;
        }
        
        .user-icon-btn {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 20px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          text-decoration: none !important;
        }
        
        .user-icon-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          color: white;
        }
        
        /* Enhanced Sidebar Styles - Matching Navbar Colors */
        .sidebar {
          position: fixed;
          top: 0;
          right: -100%;
          width: 320px;
          height: 100vh;
          background: linear-gradient(90deg, #4361ee, #3f37c9);
          z-index: 1050;
          transition: right 0.3s ease;
          box-shadow: -5px 0 25px rgba(0, 0, 0, 0.2);
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }
        
        .sidebar-open {
          right: 0;
        }
        
        .sidebar-header {
          padding: 25px 20px;
          background: rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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
          font-weight: 800;
          font-size: 22px;
          color: white;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Montserrat', sans-serif;
        }
        
        .sidebar-logo-sub {
          font-weight: 600;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.8);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-top: 2px;
          font-family: 'Montserrat', sans-serif;
        }
        
        .sidebar-close {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }
        
        .sidebar-close:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-user {
          padding: 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-user-avatar-container {
          position: relative;
          margin-right: 15px;
          transition: transform 0.3s ease;
        }
        
        .sidebar-user-avatar-container:hover {
          transform: scale(1.05);
        }
        
        .sidebar-user-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.2);
          object-fit: cover;
        }
        
        .sidebar-user-info {
          flex: 1;
        }
        
        .sidebar-user-name {
          font-weight: 600;
          font-size: 1.1rem;
          color: white;
          margin-bottom: 5px;
        }
        
        .sidebar-user-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .sidebar-user-meta span:first-child {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }
        
        .sidebar-user-status {
          display: flex;
          align-items: center;
          color: #4fd1c5;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .sidebar-user-status::before {
          content: '';
          width: 8px;
          height: 8px;
          background: #4fd1c5;
          border-radius: 50%;
          margin-right: 6px;
        }
        
        .sidebar-menu {
          flex: 1;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
        }
        
        .sidebar-nav {
          list-style: none;
          padding: 0;
          margin: 0 0 30px 0;
        }
        
        .sidebar-nav .nav-item {
          margin-bottom: 5px;
        }
        
        .sidebar-nav .nav-link {
          color: rgba(255, 255, 255, 0.8) !important;
          padding: 15px 20px !important;
          border-radius: 0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          font-weight: 500;
        }
        
        .sidebar-nav .nav-link:hover {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.1);
          padding-left: 25px !important;
        }
        
        .sidebar-nav .nav-link.active {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.15);
          border-left: 4px solid #4fd1c5;
          padding-left: 25px !important;
        }
        
        .sidebar-nav .nav-icon {
          margin-right: 15px;
          color: #4fd1c5;
          font-size: 18px;
        }
        
        .sidebar-logout {
          padding: 0 20px 20px;
          margin-top: auto;
        }
        
        .sidebar-logout-btn {
          width: 100%;
          background: rgba(220, 53, 69, 0.15);
          border: 1px solid rgba(220, 53, 69, 0.3);
          border-radius: 10px;
          color: #ff6b6b;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .sidebar-logout-btn:hover {
          background: rgba(220, 53, 69, 0.25);
          transform: translateY(-2px);
        }
        
        .sidebar-logout-btn i {
          margin-right: 10px;
          font-size: 18px;
        }
        
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1040;
          backdrop-filter: blur(3px);
        }
        
        /* Responsive adjustments */
        @media (max-width: 991px) {
          .navbar-collapse {
            display: none !important;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 768px) and (max-width: 991px) {
          .sidebar {
            width: 350px;
          }
        }
        
        /* Small mobile adjustments */
        @media (max-width: 576px) {
          .navbar {
            padding: 0.25rem 0;
          }
          
          .logo-main {
            font-size: 22px;
          }
          
          .logo-sub {
            font-size: 11px;
          }
          
          .logo-accent {
            height: 28px;
          }
          
          .sidebar {
            width: 280px;
          }
          
          .sidebar-header {
            padding: 20px 15px;
          }
          
          .sidebar-logo-main {
            font-size: 20px;
          }
          
          .sidebar-logo-sub {
            font-size: 10px;
          }
          
          .sidebar-user {
            padding: 15px;
          }
          
          .sidebar-user-avatar {
            width: 50px;
            height: 50px;
          }
          
          .sidebar-user-name {
            font-size: 1rem;
          }
          
          .sidebar-nav .nav-link {
            padding: 12px 15px !important;
          }
          
          .sidebar-nav .nav-link:hover,
          .sidebar-nav .nav-link.active {
            padding-left: 20px !important;
          }
        }
        
        /* Extra small mobile adjustments */
        @media (max-width: 375px) {
          .sidebar {
            width: 100%;
            right: -100%;
          }
          
          .sidebar-header {
            flex-direction: column;
            align-items: flex-start;
            padding: 15px;
          }
          
          .sidebar-logo {
            margin-bottom: 15px;
          }
          
          .sidebar-close {
            position: absolute;
            top: 15px;
            right: 15px;
          }
          
          .sidebar-user {
            flex-direction: column;
            text-align: center;
            padding: 20px 15px;
          }
          
          .sidebar-user-avatar-container {
            margin: 0 0 15px 0;
          }
        }
      `}</style>
    </nav>
  );
}