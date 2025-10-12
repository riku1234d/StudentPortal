import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContext";

export default function Navbar() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const { user } = useContext(UserContext);

  // Image URL depends on roll no
  const imageUrl = user?.rollno
    ? `https://gietuerp.in/StudentDocuments/${user.rollno}/${user.rollno}.JPG`
    : "https://via.placeholder.com/40";

  // Nav item component
  const NavItem = ({ to, children }) => {
    const active = pathname === to;
    return (
      <li className="nav-item mx-2 position-relative">
        <Link
          to={to}
          className={`nav-link px-2 ${
            active ? "active text-primary fw-semibold" : "text-dark"
          }`}
          style={{ paddingBottom: 6 }}
          onClick={() => setOpen(false)} // close mobile menu when clicking a link
        >
          {children}
        </Link>
      </li>
    );
  };

  return (
    <nav className="bg-white shadow-sm sticky-top">
      <div className="container-fluid d-flex align-items-center justify-content-between py-2 px-3">
        {/* Left: Logo + Title */}
        <Link to="/leaveform" className="d-flex align-items-center text-decoration-none">
          <img
            src={imageUrl}
            alt="Logo"
            width="40"
            height="40"
            className="rounded-circle me-2"
          />
          {/* <span className="fw-bold text-dark">GIET Portal</span> */}
        </Link>

        {/* Desktop menu (row layout) */}
        <ul className="navbar-nav d-none d-lg-flex flex-row ms-auto align-items-center">
          <NavItem to="/leaveform">Leave Form</NavItem>
          <NavItem to="/notice">Notice Board</NavItem>
          <NavItem to="/complaint">Complaint Box</NavItem> {/* ✅ Added Complaint Box */}
          <NavItem to="/bustiming">BusTiming</NavItem>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="btn d-lg-none p-2 border-0"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            // Close (X) icon
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg width="26" height="26" viewBox="0 0 24 24">
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className="d-lg-none bg-light"
        style={{
          overflow: "hidden",
          transition: "max-height .3s ease",
          maxHeight: open ? 200 : 0,
          boxShadow: open ? "inset 0 1px 0 rgba(0,0,0,.05)" : "none",
        }}
      >
        <ul className="navbar-nav px-3 py-2">
          <NavItem to="/leaveform">Leave Form</NavItem>
          <NavItem to="/notice">Notice Board</NavItem>
          <NavItem to="/bustiming">BusTime</NavItem>
          <NavItem to="/complaint">Complaint Box</NavItem> {/* ✅ Added Complaint Box */}
        </ul>
      </div>

      {/* CSS for underline animation */}
      <style>{`
        .nav-link {
          position: relative;
          text-decoration: none !important;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: #0d6efd;
          transition: width .25s ease;
          border-radius: 2px;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active::after {
          width: 100%;
          height: 3px; /* active underline */
        }
      `}</style>
    </nav>
  );
}
