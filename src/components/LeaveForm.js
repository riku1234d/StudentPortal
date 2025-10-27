import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { 
  FaCalendarAlt, FaEnvelope, FaPaperPlane, FaCheckCircle, FaTimes,
  FaFileAlt, FaUserClock, FaMapMarkerAlt, FaCommentAlt, FaClipboardList,
  FaChartLine, FaUserCheck
} from "react-icons/fa";
import { UserContext } from "./UserContext";

export default function LeaveForm() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    teacherMail: "",
    leaveType: "casual",
    emergencyContact: "",
    documents: null
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { user } = useContext(UserContext);

  // Mock attendance data
  const attendanceData = {
    present: 82,
    total: 100,
    subjects: [
      { name: "Mathematics", attended: 18, total: 20 },
      { name: "Physics", attended: 16, total: 20 },
      { name: "Chemistry", attended: 17, total: 20 },
      { name: "Computer Science", attended: 19, total: 20 },
      { name: "English", attended: 12, total: 20 }
    ]
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, documents: e.target.files[0] });
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
          leaveType: formData.leaveType,
          emergencyContact: formData.emergencyContact,
          studentName: user?.name || "Student",
          rollno: user?.rollno || "----",
          currentAttendance: attendanceData.present
        }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setFormData({ 
          fromDate: "", 
          toDate: "", 
          reason: "", 
          teacherMail: "",
          leaveType: "casual",
          emergencyContact: "",
          documents: null
        });
      } else {
        alert("❌ Error sending email. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong!");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="container-fluid py-5" style={{ 
      fontFamily: "'Inter', sans-serif",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
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
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          .leave-form-container {
            position: relative;
            z-index: 1;
            max-width: 900px;
            margin: 0 auto;
          }
          
          .leave-form-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            transition: all 0.4s ease;
            border: 1px solid #e2e8f0;
          }
          
          .leave-form-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          }
          
          .form-header {
            background: linear-gradient(135deg, #4361ee, #3f37c9);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 20px 20px 0 0;
            position: relative;
            overflow: hidden;
          }
          
          .form-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 70%);
            z-index: 0;
          }
          
          .form-header-content {
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .form-icon {
            width: 60px;
            height: 60px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
            font-size: 28px;
          }
          
          .form-header h2 {
            margin: 0;
            font-weight: 700;
            font-size: 28px;
            letter-spacing: 0.5px;
          }
          
          .form-header p {
            margin: 8px 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          
          .form-content {
            padding: 40px;
          }
          
          .form-section {
            margin-bottom: 30px;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
          }
          
          .section-title svg {
            margin-right: 10px;
            color: #4361ee;
            font-size: 20px;
          }
          
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .form-group {
            position: relative;
          }
          
          .form-label {
            font-weight: 600;
            color: #475569;
            margin-bottom: 10px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: flex;
            align-items: center;
          }
          
          .form-label svg {
            margin-right: 8px;
            font-size: 16px;
            color: #4361ee;
          }
          
          .form-control, .form-select {
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            padding: 14px 18px;
            font-size: 15px;
            transition: all 0.3s ease;
            background: #f8fafc;
            color: #1e293b;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            width: 100%;
          }
          
          .form-control:focus, .form-select:focus {
            border-color: #4361ee;
            box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.1);
            background: white;
            outline: none;
            transform: translateY(-2px);
          }
          
          .form-textarea {
            min-height: 120px;
            resize: vertical;
          }
          
          .radio-group {
            display: flex;
            gap: 15px;
            margin-top: 10px;
          }
          
          .radio-option {
            position: relative;
          }
          
          .radio-option input[type="radio"] {
            position: absolute;
            opacity: 0;
          }
          
          .radio-label {
            display: flex;
            align-items: center;
            padding: 10px 15px;
            border-radius: 10px;
            background: #f1f5f9;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .radio-option input[type="radio"]:checked + .radio-label {
            background: #eef2ff;
            border: 1px solid #c7d2fe;
            color: #4361ee;
            font-weight: 600;
          }
          
          .radio-label::before {
            content: '';
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 2px solid #cbd5e1;
            margin-right: 8px;
            transition: all 0.2s ease;
          }
          
          .radio-option input[type="radio"]:checked + .radio-label::before {
            border-color: #4361ee;
            background: #4361ee;
            box-shadow: inset 0 0 0 2px white;
          }
          
          .file-upload {
            position: relative;
            display: inline-block;
            cursor: pointer;
            width: 100%;
          }
          
          .file-upload input[type="file"] {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }
          
          .file-upload-label {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;
            border: 2px dashed #cbd5e1;
            border-radius: 12px;
            background: #f8fafc;
            transition: all 0.3s ease;
          }
          
          .file-upload-label:hover {
            border-color: #4361ee;
            background: #f0f4ff;
          }
          
          .file-upload-icon {
            font-size: 32px;
            color: #94a3b8;
            margin-bottom: 10px;
          }
          
          .file-upload-text {
            font-size: 14px;
            color: #64748b;
            text-align: center;
          }
          
          .btn-submit {
            background: linear-gradient(135deg, #4361ee, #3f37c9);
            border: none;
            border-radius: 12px;
            padding: 16px;
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
            margin-top: 20px;
            position: relative;
            overflow: hidden;
          }
          
          .btn-submit::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.6s;
          }
          
          .btn-submit:hover::before {
            left: 100%;
          }
          
          .btn-submit:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(67, 97, 238, 0.4);
          }
          
          .attendance-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 30px;
            border: 1px solid #e2e8f0;
          }
          
          .attendance-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
          }
          
          .attendance-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            display: flex;
            align-items: center;
          }
          
          .attendance-title svg {
            margin-right: 8px;
            color: #4361ee;
          }
          
          .attendance-percentage {
            font-size: 24px;
            font-weight: 700;
            color: #4361ee;
          }
          
          .attendance-bar {
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
          }
          
          .attendance-progress {
            height: 100%;
            background: linear-gradient(90deg, #4361ee, #3f37c9);
            border-radius: 4px;
            width: ${attendanceData.present}%;
          }
          
          .attendance-subjects {
            margin-top: 15px;
          }
          
          .attendance-subject {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            font-size: 14px;
            color: #64748b;
          }
          
          .attendance-subject:last-child {
            margin-bottom: 0;
          }
          
          .subject-name {
            font-weight: 500;
          }
          
          .subject-attendance {
            display: flex;
            align-items: center;
          }
          
          .subject-attendance span {
            margin-left: 5px;
            font-weight: 600;
          }
          
          .subject-attendance.low {
            color: #ef4444;
          }
          
          .subject-attendance.medium {
            color: #f59e0b;
          }
          
          .subject-attendance.high {
            color: #10b981;
          }
          
          .modal-content {
            border: none;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          }
          
          .modal-header {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            border: none;
            padding: 20px 25px;
            border-radius: 20px 20px 0 0;
          }
          
          .modal-title {
            font-weight: 600;
            display: flex;
            align-items: center;
            font-size: 18px;
          }
          
          .modal-body {
            padding: 30px;
            text-align: center;
            background: white;
          }
          
          .success-icon {
            width: 70px;
            height: 70px;
            background: #d1fae5;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
          }
          
          .success-icon svg {
            font-size: 32px;
            color: #10b981;
          }
          
          .success-message {
            font-size: 20px;
            font-weight: 600;
            color: #1e293b;
            margin-bottom: 10px;
          }
          
          .success-submessage {
            color: #64748b;
            margin-bottom: 25px;
            font-size: 16px;
            line-height: 1.5;
          }
          
          .btn-close-modal {
            background: linear-gradient(135deg, #10b981, #059669);
            border: none;
            border-radius: 10px;
            padding: 12px 25px;
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          }
          
          .btn-close-modal:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
          }
        `}
      </style>

      <div className="leave-form-container">
        <motion.div
          className="leave-form-card"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="form-header">
            <div className="form-header-content">
              <div className="form-icon">
                <FaFileAlt />
              </div>
              <h2>Leave Application</h2>
              <p>Submit your leave request with all required details</p>
            </div>
          </div>
          
          <div className="form-content">
            {/* Attendance Section */}
            <div className="attendance-card">
              <div className="attendance-header">
                <div className="attendance-title">
                  <FaChartLine /> Current Attendance
                </div>
                <div className="attendance-percentage">{attendanceData.present}%</div>
              </div>
              
              <div className="attendance-bar">
                <div className="attendance-progress"></div>
              </div>
              
              <div className="attendance-subjects">
                {attendanceData.subjects.map((subject, index) => {
                  const percentage = Math.round((subject.attended / subject.total) * 100);
                  let attendanceClass = "medium";
                  if (percentage >= 85) attendanceClass = "high";
                  else if (percentage < 75) attendanceClass = "low";
                  
                  return (
                    <div key={index} className="attendance-subject">
                      <span className="subject-name">{subject.name}</span>
                      <div className="subject-attendance">
                        ({subject.attended}/{subject.total})
                        <span className={attendanceClass}>{percentage}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Leave Details Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaCalendarAlt /> Leave Details
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
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

                  <div className="form-group">
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
                </div>

                <div className="form-group">
                  <label className="form-label">Leave Type</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="casual"
                        name="leaveType"
                        value="casual"
                        checked={formData.leaveType === "casual"}
                        onChange={handleChange}
                      />
                      <label htmlFor="casual" className="radio-label">
                        Casual Leave
                      </label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="medical"
                        name="leaveType"
                        value="medical"
                        checked={formData.leaveType === "medical"}
                        onChange={handleChange}
                      />
                      <label htmlFor="medical" className="radio-label">
                        Medical Leave
                      </label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="emergency"
                        name="leaveType"
                        value="emergency"
                        checked={formData.leaveType === "emergency"}
                        onChange={handleChange}
                      />
                      <label htmlFor="emergency" className="radio-label">
                        Emergency Leave
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaEnvelope /> Contact Information
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Class Teacher Email</label>
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

                  <div className="form-group">
                    <label className="form-label">Emergency Contact</label>
                    <input
                      type="text"
                      className="form-control"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Phone number of emergency contact"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Reason Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaCommentAlt /> Reason for Leave
                </h3>
                
                <div className="form-group">
                  <textarea
                    className="form-control form-textarea"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Please provide detailed reason for your leave application..."
                    required
                  ></textarea>
                </div>
              </div>

              {/* Document Upload Section */}
              <div className="form-section">
                <h3 className="section-title">
                  <FaClipboardList /> Supporting Documents
                </h3>
                
                <div className="form-group">
                  <div className="file-upload">
                    <input
                      type="file"
                      id="documents"
                      name="documents"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="documents" className="file-upload-label">
                      <div className="file-upload-icon">
                        <FaPaperPlane />
                      </div>
                      <div className="file-upload-text">
                        {formData.documents 
                          ? formData.documents.name 
                          : "Click to upload medical certificate or other supporting documents"}
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-grid">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn-submit"
                >
                  Submit Application
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaCheckCircle className="me-2" />
                  Application Submitted
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
                <h3 className="success-message">Leave Application Submitted Successfully!</h3>
                <p className="success-submessage">
                  Your leave application has been submitted to your class teacher. You will receive a notification once it's approved.
                </p>
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