// src/components/ComplaintBox.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ComplaintBox() {
  const [formData, setFormData] = useState({
    email: "",
    complaint: "",
  });
  const [submitted, setSubmitted] = useState(false);

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
          recipient: formData.email,
          complaint: formData.complaint,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ email: "", complaint: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("❌ Error submitting complaint.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong!");
    }
  };

  return (
    <div className="container mt-5">
      <motion.div
        className="card shadow-sm border-0 rounded-4 p-4 mx-auto"
        style={{ maxWidth: "600px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="fw-bold text-center mb-4">Complaint Box</h3>

        {submitted && (
          <motion.div
            className="alert alert-success text-center fw-semibold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✅ Your complaint has been submitted successfully!
          </motion.div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Send To (Email)</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter recipient email (e.g. hod@giet.edu)"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Complaint Field */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Complaint</label>
            <textarea
              className="form-control"
              name="complaint"
              rows="4"
              placeholder="Write your complaint here..."
              value={formData.complaint}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-grid">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="btn btn-danger fw-bold"
              style={{ borderRadius: "8px" }}
            >
              Submit Complaint
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}