import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./UserContext";

export default function LeaveForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    teacherMail: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { user } = useContext(UserContext);

  // Build photo URL from rollno
  const imageUrl = user?.rollno
    ? `https://gietuerp.in/StudentDocuments/${user.rollno}/${user.rollno}.JPG`
    : "https://via.placeholder.com/120";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/xzzjdkkj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromDate: formData.fromDate,
          toDate: formData.toDate,
          reason: formData.reason,
          teacherMail: formData.teacherMail,
          studentName: user?.name || "Student",
          rollno: user?.rollno || "----",
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ fromDate: "", toDate: "", reason: "", teacherMail: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("❌ Error sending email. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {/* Left side - Student Details */}
        <motion.div
          className="col-md-5"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card border-0 shadow-sm rounded-4 text-center h-100 p-4">
            <img
              src={imageUrl}
              alt="Student"
              className="img-fluid mb-3"
              style={{
                width: "120px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h5 className="fw-bold">{user?.name || "Student Name"}</h5>
            <p className="text-muted mb-1">Roll No: {user?.rollno || "----"}</p>
            <p className="text-muted mb-1">Attendance: 82%</p>
            <p className="text-muted mb-1">Class: B.Tech CSE - 4th Sem</p>
            <p className="text-muted">Class Teacher: Prof. S. Sharma</p>
          </div>
        </motion.div>

        {/* Right side - Leave Form */}
        <motion.div
          className="col-md-7"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold text-center mb-4">Leave Application</h4>

            {submitted && (
              <motion.div
                className="alert alert-success text-center fw-semibold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                ✅ Leave Application Submitted Successfully
              </motion.div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">From Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="fromDate"
                  value={formData.fromDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">To Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="toDate"
                  value={formData.toDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* New Input: Class Teacher Mail */}
              <div className="mb-3">
                <label className="form-label">Class Teacher Mail</label>
                <input
                  type="email"
                  className="form-control"
                  name="teacherMail"
                  value={formData.teacherMail}
                  onChange={handleChange}
                  placeholder="Enter class teacher's email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Reason</label>
                <textarea
                  className="form-control"
                  name="reason"
                  rows="3"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Enter reason for leave..."
                  required
                ></textarea>
              </div>

              <div className="d-grid">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="btn btn-primary fw-bold"
                  style={{ borderRadius: "8px" }}
                >
                  Submit Application
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
