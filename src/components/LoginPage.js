import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock, FaUserTie, FaExclamationTriangle, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ rollno: "", password: "" });
  const [userType, setUserType] = useState("student");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const classTeacherEmail = "classteacher@giet.edu";
    const adminPassword = "admin123";

    if (userType === "teacher") {
      const email = formData.rollno.toLowerCase();

      if (email === classTeacherEmail && formData.password === adminPassword) {
        setUser({
          rollno: formData.rollno,
          name: "Class Teacher",
          role: "ClassTeacher",
        });
        navigate("/admin/class-teacher");
      } else {
        setShowErrorModal(true);
      }
    } else {
      // Student login - roll number and password must match
      if (formData.rollno === formData.password && formData.rollno !== "") {
        setUser({
          rollno: formData.rollno,
          name: "Student Name",
          role: "Student",
        });
        navigate("/leaveform");
      } else {
        setShowErrorModal(true);
      }
    }
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100" style={{ backgroundColor: '#f5f7fa' }}>
      <style>
        {`
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
          }
          .login-container {
            width: 420px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .login-header {
            background: linear-gradient(135deg, #1a2a6c, #b21f1f, #1a2a6c);
            background-size: 200% 200%;
            animation: gradient 15s ease infinite;
            padding: 40px 30px;
            text-align: center;
            color: white;
          }
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .login-icon {
            font-size: 48px;
            margin-bottom: 15px;
          }
          .login-title {
            font-weight: 300;
            font-size: 28px;
            letter-spacing: 1px;
            margin: 0;
          }
          .role-tabs {
            display: flex;
            border-bottom: 1px solid #eaeaea;
            background: #f8f9fa;
          }
          .role-tab {
            flex: 1;
            padding: 18px 0;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6c757d;
            font-weight: 500;
            position: relative;
          }
          .role-tab.active {
            color: #1a2a6c;
            background: white;
          }
          .role-tab.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background: #1a2a6c;
          }
          .role-icon {
            display: block;
            font-size: 24px;
            margin: 0 auto 8px;
          }
          .form-container {
            padding: 30px;
          }
          .form-group {
            margin-bottom: 25px;
          }
          .form-label {
            font-weight: 600;
            color: #495057;
            margin-bottom: 8px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .input-group {
            position: relative;
          }
          .input-group-text {
            background: #f8f9fa;
            border: 1px solid #e9ecef;
            border-right: none;
            color: #6c757d;
            padding: 12px 15px;
          }
          .form-control {
            border: 1px solid #e9ecef;
            border-left: none;
            padding: 12px 15px;
            font-size: 15px;
            transition: all 0.3s ease;
          }
          .form-control:focus {
            border-color: #1a2a6c;
            box-shadow: 0 0 0 0.2rem rgba(26, 42, 108, 0.1);
          }
          .btn-login {
            background: linear-gradient(135deg, #1a2a6c, #2c3e50);
            border: none;
            border-radius: 6px;
            padding: 14px;
            font-weight: 600;
            letter-spacing: 1px;
            color: white;
            width: 100%;
            margin-top: 10px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            font-size: 14px;
          }
          .btn-login:hover {
            background: linear-gradient(135deg, #2c3e50, #1a2a6c);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .modal-content {
            border: none;
            border-radius: 12px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          }
          .modal-header {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border-radius: 12px 12px 0 0;
            border: none;
          }
          .modal-body {
            padding: 30px;
          }
          .alert-warning {
            border-left: 4px solid #f39c12;
            background: #fef9e7;
            border: none;
            color: #7d6608;
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-header">
          <div className="login-icon">
            {userType === "teacher" ? <FaChalkboardTeacher /> : <FaGraduationCap />}
          </div>
          <h2 className="login-title">{userType === "teacher" ? "Faculty Portal" : "Student Portal"}</h2>
        </div>

        <div className="role-tabs">
          <div 
            className={`role-tab ${userType === "student" ? "active" : ""}`}
            onClick={() => setUserType("student")}
          >
            <FaGraduationCap className="role-icon" />
            Student
          </div>
          <div 
            className={`role-tab ${userType === "teacher" ? "active" : ""}`}
            onClick={() => setUserType("teacher")}
          >
            <FaChalkboardTeacher className="role-icon" />
            Faculty
          </div>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                {userType === "teacher" ? "Email Address" : "Roll Number"}
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  type={userType === "teacher" ? "email" : "text"}
                  name="rollno"
                  placeholder={userType === "teacher" ? "faculty@giet.edu" : "e.g., 23CSE200"}
                  value={formData.rollno}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-control"
                />
              </div>
            </div>

            <button type="submit" className="btn-login">
              Sign In
            </button>
          </form>
        </div>
      </div>

      {/* Error Modal */}
      {showErrorModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title d-flex align-items-center">
                  <FaExclamationTriangle className="me-2" />
                  Authentication Error
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={closeErrorModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="text-center">
                  <FaExclamationTriangle className="text-danger mb-3" style={{ fontSize: '48px' }} />
                  <h4>Invalid Credentials</h4>
                  <p className="text-muted mt-2">
                    The credentials you provided are incorrect. Please try again.
                  </p>
                  <div className="alert alert-warning mt-4">
                    <strong>Security Notice:</strong> For your protection, our system does not provide specific details about authentication failures.
                    If you continue to experience issues, please contact the IT support team.
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={closeErrorModal}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}