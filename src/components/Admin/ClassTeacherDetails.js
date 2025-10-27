 // src/components/Admin/ClassTeacherDetails.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import {
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBook,
  FaCalendarAlt,
  FaEdit,
  FaArrowLeft
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ClassTeacherDetails() {
  const { teacherId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('personal');

  // Mock data - in a real app, this would come from an API
  const mockTeachers = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      employeeId: "TCH2023001",
      department: "Computer Science",
      email: "sarah.johnson@giet.edu",
      phone: "+91 9876543210",
      address: "123 Faculty Housing, GIET Campus",
      qualifications: "Ph.D. in Computer Science",
      experience: "15 years",
      specialization: "Artificial Intelligence",
      classes: ["CSE-A", "CSE-B"],
      subjects: ["Data Structures", "Algorithms", "Machine Learning"],
      joinDate: "2008-07-15",
      bio: "Dr. Sarah Johnson is a renowned professor in the field of Artificial Intelligence with over 15 years of teaching experience. She has published numerous research papers and has guided several PhD students.",
      achievements: [
        "Best Teacher Award - 2020",
        "Research Excellence Award - 2019",
        "Innovation in Teaching Award - 2018"
      ]
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      employeeId: "TCH2023002",
      department: "Electrical Engineering",
      email: "michael.chen@giet.edu",
      phone: "+91 9876543211",
      address: "124 Faculty Housing, GIET Campus",
      qualifications: "M.Tech, Ph.D. (Pursuing)",
      experience: "10 years",
      specialization: "Power Systems",
      classes: ["EEE-A", "EEE-B"],
      subjects: ["Power Systems", "Control Systems", "Renewable Energy"],
      joinDate: "2013-08-20",
      bio: "Prof. Michael Chen specializes in Power Systems and Renewable Energy. He has been instrumental in setting up the Power Systems Lab at GIET.",
      achievements: [
        "Young Scientist Award - 2021",
        "Industry Collaboration Award - 2020"
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundTeacher = mockTeachers.find(t => t.id === teacherId) || mockTeachers[0];
      setTeacher(foundTeacher);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [teacherId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container py-5 text-center">
        <h2>Teacher not found</h2>
      </div>
    );
  }

  return (
    <div className="container py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex align-items-center mb-4">
        <button 
          className="btn btn-outline-primary me-3"
          onClick={() => navigate('/admin/class-teacher')}
          style={{ borderRadius: '8px' }}
        >
          <FaArrowLeft className="me-2" /> Back
        </button>
        <h1 className="text-primary mb-0">Teacher Details</h1>
      </div>

      {/* Teacher Profile Card */}
      <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '12px' }}>
        <div className="card-body p-4">
          <div className="row">
            <div className="col-md-3 text-center mb-4 mb-md-0">
              <div className="position-relative d-inline-block">
                <img
                  src={`https://ui-avatars.com/api/?name=${teacher.name.replace(' ', '+')}&background=4361ee&color=fff&size=150`}
                  alt={teacher.name}
                  className="rounded-circle img-fluid border-4 border-white shadow-sm"
                  style={{ width: '150px', height: '150px' }}
                />
                <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white">
                  <span className="visually-hidden">Online</span>
                </div>
              </div>
              <h4 className="mt-3">{teacher.name}</h4>
              <p className="text-muted">{teacher.department}</p>
              <button className="btn btn-sm btn-primary mt-2" style={{ borderRadius: '8px' }}>
                <FaEdit className="me-1" /> Edit Profile
              </button>
            </div>
            
            <div className="col-md-9">
              <div className="d-flex flex-wrap mb-3">
                <div className="me-4 mb-3">
                  <h6 className="text-muted small">Employee ID</h6>
                  <p className="mb-0 fw-semibold">{teacher.employeeId}</p>
                </div>
                <div className="me-4 mb-3">
                  <h6 className="text-muted small">Department</h6>
                  <p className="mb-0 fw-semibold">{teacher.department}</p>
                </div>
                <div className="me-4 mb-3">
                  <h6 className="text-muted small">Experience</h6>
                  <p className="mb-0 fw-semibold">{teacher.experience}</p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted small">Specialization</h6>
                  <p className="mb-0 fw-semibold">{teacher.specialization}</p>
                </div>
              </div>
              
              <div className="d-flex flex-wrap mb-3">
                <div className="me-4 mb-3">
                  <h6 className="text-muted small">Email</h6>
                  <p className="mb-0">
                    <FaEnvelope className="me-1 text-muted" />
                    {teacher.email}
                  </p>
                </div>
                <div className="me-4 mb-3">
                  <h6 className="text-muted small">Phone</h6>
                  <p className="mb-0">
                    <FaPhone className="me-1 text-muted" />
                    {teacher.phone}
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted small">Address</h6>
                  <p className="mb-0">
                    <FaMapMarkerAlt className="me-1 text-muted" />
                    {teacher.address}
                  </p>
                </div>
              </div>
              
              <div className="mb-3">
                <h6 className="text-muted small">Join Date</h6>
                <p className="mb-0">
                  <FaCalendarAlt className="me-1 text-muted" />
                  {formatDate(teacher.joinDate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-white border-0 p-0">
          <ul className="nav nav-tabs border-0" role="tablist">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'personal' ? 'active' : ''}`}
                onClick={() => setActiveTab('personal')}
                style={{ borderRadius: '8px 8px 0 0', border: 'none' }}
              >
                <FaUserTie className="me-2" /> Personal Info
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'academic' ? 'active' : ''}`}
                onClick={() => setActiveTab('academic')}
                style={{ borderRadius: '8px 8px 0 0', border: 'none' }}
              >
                <FaGraduationCap className="me-2" /> Academic Info
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'classes' ? 'active' : ''}`}
                onClick={() => setActiveTab('classes')}
                style={{ borderRadius: '8px 8px 0 0', border: 'none' }}
              >
                <FaChalkboardTeacher className="me-2" /> Classes
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'achievements' ? 'active' : ''}`}
                onClick={() => setActiveTab('achievements')}
                style={{ borderRadius: '8px 8px 0 0', border: 'none' }}
              >
                <FaBook className="me-2" /> Achievements
              </button>
            </li>
          </ul>
        </div>
        
        <div className="card-body p-4">
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div>
              <h5 className="mb-3">Biography</h5>
              <p className="text-muted">{teacher.bio}</p>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Contact Information</h6>
                  <div className="mb-2">
                    <span className="text-muted me-2">Email:</span>
                    <span>{teacher.email}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted me-2">Phone:</span>
                    <span>{teacher.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted me-2">Address:</span>
                    <span>{teacher.address}</span>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <h6 className="fw-bold mb-3">Professional Details</h6>
                  <div className="mb-2">
                    <span className="text-muted me-2">Employee ID:</span>
                    <span>{teacher.employeeId}</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted me-2">Department:</span>
                    <span>{teacher.department}</span>
                  </div>
                  <div>
                    <span className="text-muted me-2">Join Date:</span>
                    <span>{formatDate(teacher.joinDate)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Academic Info Tab */}
          {activeTab === 'academic' && (
            <div>
              <h5 className="mb-3">Academic Qualifications</h5>
              <p className="text-muted mb-4">{teacher.qualifications}</p>
              
              <h6 className="fw-bold mb-3">Specialization</h6>
              <p className="text-muted mb-4">{teacher.specialization}</p>
              
              <h6 className="fw-bold mb-3">Teaching Experience</h6>
              <p className="text-muted">{teacher.experience}</p>
            </div>
          )}
          
          {/* Classes Tab */}
          {activeTab === 'classes' && (
            <div>
              <h5 className="mb-3">Classes Assigned</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {teacher.classes.map((cls, index) => (
                  <span key={index} className="badge bg-primary p-2" style={{ fontSize: '0.9rem' }}>
                    {cls}
                  </span>
                ))}
              </div>
              
              <h5 className="mb-3">Subjects Taught</h5>
              <div className="d-flex flex-wrap gap-2">
                {teacher.subjects.map((subject, index) => (
                  <span key={index} className="badge bg-info p-2" style={{ fontSize: '0.9rem' }}>
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h5 className="mb-3">Achievements & Awards</h5>
              <ul className="list-group">
                {teacher.achievements.map((achievement, index) => (
                  <li key={index} className="list-group-item border-0 ps-0">
                    <div className="d-flex align-items-center">
                      <div className="bg-success bg-opacity-10 rounded-circle p-2 me-3">
                        <FaBook className="text-success" />
                      </div>
                      <div>
                        <h6 className="mb-1">{achievement}</h6>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex justify-content-end mt-4">
        <button 
          className="btn btn-primary me-2"
          style={{ borderRadius: '8px' }}
        >
          <FaEdit className="me-2" /> Edit Teacher
        </button>
        <button 
          className="btn btn-outline-danger"
          style={{ borderRadius: '8px' }}
        >
          Delete Teacher
        </button>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .nav-link.active {
            color: #4361ee !important;
            background-color: rgba(67, 97, 238, 0.1) !important;
            border-bottom: 2px solid #4361ee !important;
          }
          
          .nav-link:hover {
            color: #4361ee !important;
            background-color: rgba(67, 97, 238, 0.05) !important;
          }
          
          .card {
            transition: all 0.3s ease;
          }
          
          .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          
          .badge {
            transition: all 0.3s ease;
          }
          
          .badge:hover {
            transform: translateY(-2px);
          }
        `}
      </style>
    </div>
  );
}