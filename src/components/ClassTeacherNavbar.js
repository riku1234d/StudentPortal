import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBell,
  FaClipboardList,
  FaUsers,
  FaCalendarAlt,
  FaSignOutAlt,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { UserContext } from "./UserContext";

export default function ClassTeacherNavbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow">
      <Link className="navbar-brand fw-bold d-flex align-items-center" to="#">
        <FaChalkboardTeacher className="me-2" size={22} />
        <div className="sidebar-logo">
            <div className="sidebar-logo-content">
              <span className="sidebar-logo-main">GIET</span>
              <span className="sidebar-logo-sub">OnePoint</span>
            </div>
          </div>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#teacherNavbar"
        aria-controls="teacherNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="teacherNavbar">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* Notice Management */}
          <li className="nav-item">
            <Link className="nav-link" to="/teacher/notice-management">
              <FaClipboardList className="me-1" />
              Notice Management
            </Link>
          </li>

          {/* Student Details */}
          <li className="nav-item">
            <Link className="nav-link" to="/teacher/student-details">
              <FaUsers className="me-1" />
              Student Details
            </Link>
          </li>

          {/* Holiday Details */}
          <li className="nav-item">
            <Link className="nav-link" to="/teacher/holiday-details">
              <FaCalendarAlt className="me-1" />
              Holiday Details
            </Link>
          </li>
        </ul>

        {/* Right side */}
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
          {/* Notification Bell */}
          <li className="nav-item me-3 position-relative">
            <FaBell
              size={20}
              className="text-white"
              style={{ cursor: "pointer" }}
            />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.6rem" }}
            >
              2
            </span>
          </li>

          {/* Teacher Name */}
          <li className="nav-item me-2">
            <span className="nav-link text-white fw-semibold">
              {user?.name || "Class Teacher"}
            </span>
          </li>

          {/* Logout Button */}
          <li className="nav-item">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="me-1" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
