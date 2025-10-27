import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import {
  FaUserGraduate,
  FaFileAlt,
  FaCommentDots,
  FaBus,
  FaBell,
  FaCalendarAlt,
  FaChartBar,
  FaClock,
  FaCheckCircle,
  FaArrowRight
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  // Add debugging
  console.log("Dashboard component rendering");
  
  const { user } = useContext(UserContext);
  console.log("User from context:", user);
  
  const navigate = useNavigate();
  const [recentNotices, setRecentNotices] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Dashboard useEffect triggered");
    
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data
      setRecentNotices([
        { id: 1, title: "Holiday Announcement", date: "2023-08-10", priority: "High" },
        { id: 2, title: "Examination Schedule", date: "2023-08-05", priority: "Medium" },
        { id: 3, title: "Library Hours", date: "2023-08-01", priority: "Low" }
      ]);
      
      setLeaveStatus({
        totalLeaves: 12,
        usedLeaves: 5,
        pendingLeaves: 1,
        approvedLeaves: 4
      });
      
      setLoading(false);
      console.log("Dashboard data loaded");
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "danger";
      case "Medium": return "warning";
      case "Low": return "info";
      default: return "secondary";
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
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

  return (
    <div className="container py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="text-primary mb-1">Student Dashboard</h1>
          <p className="text-muted">Welcome back, {user?.name || 'Student'}! Here's what's happening today.</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button 
            className="btn btn-primary d-flex align-items-center shadow-sm"
            onClick={() => navigate('/leaveform')}
            style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
          >
            <FaFileAlt className="me-2" /> Apply for Leave
          </button>
          <button 
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={() => navigate('/student-details')}
            style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
          >
            <FaUserGraduate className="me-2" /> View Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-primary bg-opacity-10 rounded-circle p-3">
                <FaFileAlt className="text-primary" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Leaves</h6>
                <h3 className="mb-0">{leaveStatus.totalLeaves}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-warning bg-opacity-10 rounded-circle p-3">
                <FaClock className="text-warning" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Pending Leaves</h6>
                <h3 className="mb-0">{leaveStatus.pendingLeaves}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-success bg-opacity-10 rounded-circle p-3">
                <FaCheckCircle className="text-success" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Approved Leaves</h6>
                <h3 className="mb-0">{leaveStatus.approvedLeaves}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-info bg-opacity-10 rounded-circle p-3">
                <FaBell className="text-info" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">New Notices</h6>
                <h3 className="mb-0">{recentNotices.length}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Recent Notices */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <FaBell className="text-primary me-2" />
                  Recent Notices
                </h5>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate('/notice')}
                >
                  View All <FaArrowRight className="ms-1" size={12} />
                </button>
              </div>
            </div>
            <div className="card-body">
              {recentNotices.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentNotices.map((notice) => (
                    <div key={notice.id} className="list-group-item px-0 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{notice.title}</h6>
                          <div className="d-flex align-items-center text-muted small">
                            <FaCalendarAlt className="me-1" size={12} />
                            <span>{formatDate(notice.date)}</span>
                          </div>
                        </div>
                        <span className={`badge bg-${getPriorityColor(notice.priority)}`} style={{ borderRadius: '20px' }}>
                          {notice.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaBell className="text-muted mb-2" style={{ fontSize: '2rem' }} />
                  <p className="text-muted">No notices found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Leave Status */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <FaFileAlt className="text-warning me-2" />
                  Leave Status
                </h5>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate('/leaveform')}
                >
                  View All <FaArrowRight className="ms-1" size={12} />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Leaves</span>
                  <span>{leaveStatus.totalLeaves}</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: '100%' }}
                    aria-valuenow="100" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Used Leaves</span>
                  <span>{leaveStatus.usedLeaves} / {leaveStatus.totalLeaves}</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: `${(leaveStatus.usedLeaves / leaveStatus.totalLeaves) * 100}%` }}
                    aria-valuenow={(leaveStatus.usedLeaves / leaveStatus.totalLeaves) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span>Approved Leaves</span>
                  <span>{leaveStatus.approvedLeaves} / {leaveStatus.usedLeaves}</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: `${(leaveStatus.approvedLeaves / leaveStatus.usedLeaves) * 100}%` }}
                    aria-valuenow={(leaveStatus.approvedLeaves / leaveStatus.usedLeaves) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Pending Leaves</span>
                  <span>{leaveStatus.pendingLeaves}</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    style={{ width: `${(leaveStatus.pendingLeaves / leaveStatus.totalLeaves) * 100}%` }}
                    aria-valuenow={(leaveStatus.pendingLeaves / leaveStatus.totalLeaves) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-12 mb-4">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <h5 className="card-title mb-0 d-flex align-items-center">
                <FaChartBar className="text-success me-2" />
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-6 col-lg-3">
                  <Link 
                    to="/leaveform" 
                    className="btn btn-outline-primary d-flex align-items-center justify-content-between p-3 w-100"
                    style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                  >
                    <div className="d-flex align-items-center">
                      <FaFileAlt className="me-3" />
                      <span>Apply for Leave</span>
                    </div>
                    <FaArrowRight />
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-3">
                  <Link 
                    to="/notice" 
                    className="btn btn-outline-info d-flex align-items-center justify-content-between p-3 w-100"
                    style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                  >
                    <div className="d-flex align-items-center">
                      <FaBell className="me-3" />
                      <span>View Notices</span>
                    </div>
                    <FaArrowRight />
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-3">
                  <Link 
                    to="/complaint" 
                    className="btn btn-outline-warning d-flex align-items-center justify-content-between p-3 w-100"
                    style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                  >
                    <div className="d-flex align-items-center">
                      <FaCommentDots className="me-3" />
                      <span>Complaint Box</span>
                    </div>
                    <FaArrowRight />
                  </Link>
                </div>
                
                <div className="col-md-6 col-lg-3">
                  <Link 
                    to="/bustiming" 
                    className="btn btn-outline-success d-flex align-items-center justify-content-between p-3 w-100"
                    style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                  >
                    <div className="d-flex align-items-center">
                      <FaBus className="me-3" />
                      <span>Bus Timing</span>
                    </div>
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          .card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          
          .btn-primary {
            background-color: #4a89dc;
            border-color: #4a89dc;
          }
          
          .btn-primary:hover {
            background-color: #3a79cc;
            border-color: #3a79cc;
          }
        `}
      </style>
    </div>
  );
}