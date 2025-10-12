import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({ rollno: "", password: "" });
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

    // Save logged in user into context
    setUser({
      rollno: formData.rollno,
      name: "Student Name", // You can fetch from DB later
    });

    // Redirect to Leave Form
    navigate("/leaveform");
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-gradient">
      <style>
        {`
          .bg-gradient {
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
          }
          .login-card {
            border-radius: 20px;
            padding: 30px;
            background: #fff;
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
          }
          .login-icon {
            font-size: 60px;
            color: #2575fc;
          }
        `}
      </style>

      <div className="card login-card" style={{ width: "380px" }}>
        <div className="text-center mb-4">
          <FaUser className="login-icon" />
          <h3 className="mt-2 fw-bold">Student Login</h3>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Roll No */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Roll Number</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaUser />
              </span>
              <input
                type="text"
                name="rollno"
                placeholder="Enter your Roll No"
                value={formData.rollno}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100 py-2 mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
