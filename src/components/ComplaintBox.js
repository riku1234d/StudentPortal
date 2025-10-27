import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEnvelope, FaCommentAlt, FaPaperPlane, FaCheckCircle, FaTimes, FaShieldAlt, FaUserTie, FaClock, FaPhone, FaIdCard } from "react-icons/fa";

export default function ComplaintBox() {
  const [formData, setFormData] = useState({
    email: "",
    complaint: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [complaintId, setComplaintId] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateComplaintId = () => {
    // Generate a unique complaint ID with timestamp
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `CMP-${timestamp}-${random}`;
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
        const newComplaintId = generateComplaintId();
        setComplaintId(newComplaintId);
        setShowSuccessModal(true);
        setFormData({ email: "", complaint: "" });
      } else {
        alert("❌ Error submitting complaint.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong!");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setComplaintId("");
  };

  return (
    <div className="container-fluid py-5" style={{ 
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      minHeight: "100vh",
      position: "relative"
    }}>
      {/* Background Pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.5,
        zIndex: 0
      }}></div>

      <style>
        {`
          .complaint-container {
            position: relative;
            z-index: 1;
            max-width: 800px;
            margin: 0 auto;
          }
          
          .complaint-card {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            overflow: hidden;
            transition: all 0.3s ease;
            border: 1px solid #e9ecef;
          }
          
          .complaint-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
          }
          
          .card-header {
            background: linear-gradient(135deg, #4361ee, #3f37c9);
            color: white;
            padding: 25px 30px;
            position: relative;
            overflow: hidden;
          }
          
          .card-header::before {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
          }
          
          .header-content {
            position: relative;
            z-index: 1;
            display: flex;
            align-items: center;
          }
          
          .header-icon {
            width: 50px;
            height: 50px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 20px;
            font-size: 24px;
          }
          
          .header-text h3 {
            margin: 0;
            font-weight: 600;
            font-size: 24px;
            letter-spacing: 0.5px;
          }
          
          .header-text p {
            margin: 5px 0 0;
            opacity: 0.8;
            font-size: 14px;
          }
          
          .card-body {
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
            display: flex;
            align-items: center;
          }
          
          .form-label svg {
            margin-right: 8px;
            color: #4361ee;
          }
          
          .form-control {
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 12px 16px;
            font-size: 15px;
            transition: all 0.2s ease;
            background-color: #f8f9fa;
          }
          
          .form-control:focus {
            border-color: #4361ee;
            box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
            background-color: white;
            outline: none;
          }
          
          .btn-submit {
            background: linear-gradient(135deg, #4361ee, #3f37c9);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 24px;
            font-weight: 600;
            font-size: 15px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
          }
          
          .btn-submit:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(67, 97, 238, 0.4);
          }
          
          .btn-submit svg {
            margin-right: 8px;
          }
          
          .security-notice {
            margin-top: 25px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
            border-left: 4px solid #4361ee;
          }
          
          .security-notice h6 {
            font-weight: 600;
            color: #495057;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
          }
          
          .security-notice h6 svg {
            margin-right: 8px;
            color: #4361ee;
          }
          
          .security-notice p {
            margin: 0;
            font-size: 14px;
            color: #6c757d;
          }
          
          .modal-content {
            border: none;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }
          
          .modal-header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 20px 25px;
          }
          
          .modal-title {
            font-weight: 600;
            font-size: 18px;
            display: flex;
            align-items: center;
          }
          
          .modal-title svg {
            margin-right: 10px;
          }
          
          .modal-body {
            padding: 30px;
            text-align: center;
          }
          
          .success-icon {
            width: 80px;
            height: 80px;
            background: #d1fae5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
          }
          
          .success-icon svg {
            font-size: 40px;
            color: #10b981;
          }
          
          .complaint-id {
            background: #f3f4f6;
            border-radius: 8px;
            padding: 12px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            font-weight: 600;
            color: #4361ee;
            letter-spacing: 1px;
          }
          
          .timeline {
            margin: 25px 0;
            text-align: left;
          }
          
          .timeline h6 {
            font-weight: 600;
            color: #495057;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .timeline h6 svg {
            margin-right: 8px;
            color: #4361ee;
          }
          
          .timeline-steps {
            padding-left: 20px;
          }
          
          .timeline-step {
            position: relative;
            padding-left: 30px;
            margin-bottom: 15px;
            font-size: 14px;
            color: #6c757d;
          }
          
          .timeline-step::before {
            content: '';
            position: absolute;
            left: 0;
            top: 6px;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #4361ee;
          }
          
          .contact-info {
            background: #f8f9fa;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            text-align: left;
          }
          
          .contact-info h6 {
            font-weight: 600;
            color: #495057;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
          }
          
          .contact-info h6 svg {
            margin-right: 8px;
            color: #4361ee;
          }
          
          .contact-details {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
          }
          
          .contact-item {
            display: flex;
            align-items: center;
            font-size: 14px;
            color: #6c757d;
          }
          
          .contact-item svg {
            margin-right: 8px;
            color: #4361ee;
            font-size: 16px;
          }
          
          .success-message {
            font-size: 20px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 10px;
          }
          
          .success-submessage {
            color: #6b7280;
            margin-bottom: 20px;
            font-size: 15px;
            line-height: 1.5;
          }
          
          .btn-close-modal {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 25px;
            font-weight: 600;
            font-size: 15px;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            margin-top: 10px;
          }
          
          .btn-close-modal:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
        `}
      </style>

      <div className="complaint-container">
        <motion.div
          className="complaint-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-header">
            <div className="header-content">
              <div className="header-icon">
                <FaCommentAlt />
              </div>
              <div className="header-text">
                <h3>Complaint Box</h3>
                <p>Your feedback helps us improve our services</p>
              </div>
            </div>
          </div>
          
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <FaEnvelope /> Recipient Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="e.g., hod@giet.edu"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <FaCommentAlt /> Your Complaint
                </label>
                <textarea
                  className="form-control"
                  name="complaint"
                  rows="5"
                  placeholder="Please describe your issue in detail..."
                  value={formData.complaint}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="d-grid">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-submit"
                >
                  <FaPaperPlane /> Submit Complaint
                </motion.button>
              </div>
            </form>

            <div className="security-notice">
              <h6><FaShieldAlt /> Confidential & Secure</h6>
              <p>Your complaint will be handled with complete confidentiality. Our team will review your feedback and take appropriate action within 48 hours.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Success Modal */}
      {showSuccessModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaCheckCircle /> Complaint Submitted Successfully
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={closeSuccessModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                
                <h3 className="success-message">Your Complaint Has Been Registered</h3>
                <p className="success-submessage">
                  Your complaint has been successfully submitted to the concerned authority. 
                  We take every complaint seriously and will address it promptly.
                </p>
                
                <div className="complaint-id">
                  Complaint ID: {complaintId}
                </div>
                
                <div className="timeline">
                  <h6><FaClock /> What Happens Next?</h6>
                  <div className="timeline-steps">
                    <div className="timeline-step">Your complaint will be reviewed within 24 hours</div>
                    <div className="timeline-step">You'll receive an acknowledgment email within 2 hours</div>
                    <div className="timeline-step">Resolution process will begin within 48 hours</div>
                    <div className="timeline-step">You'll receive updates on the progress</div>
                  </div>
                </div>
                
                <div className="contact-info">
                  <h6><FaUserTie /> Need Assistance?</h6>
                  <div className="contact-details">
                    <div className="contact-item">
                      <FaPhone /> +91 12345 67890
                    </div>
                    <div className="contact-item">
                      <FaEnvelope /> support@giet.edu
                    </div>
                    <div className="contact-item">
                      <FaIdCard /> Reference ID: {complaintId}
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  className="btn-close-modal"
                  onClick={closeSuccessModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}