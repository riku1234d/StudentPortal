import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaUsers,
  FaCalendarAlt,
  FaBell,
  FaChartBar,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBus,
  FaPlus,
  FaArrowRight,
  FaExclamationTriangle,
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalNotices: 24,
    pendingLeaves: 8,
    upcomingHolidays: 3,
    activeStudents: 1240
  });
  
  const [recentNotices, setRecentNotices] = useState([
    { id: 1, title: "Holiday Announcement", date: "2023-08-10", priority: "High" },
    { id: 2, title: "Examination Schedule", date: "2023-08-05", priority: "Medium" },
    { id: 3, title: "Library Hours", date: "2023-08-01", priority: "Low" }
  ]);
  
  const [recentLeaves, setRecentLeaves] = useState([
    { id: 1, student: "John Doe", date: "2023-08-15", status: "Pending" },
    { id: 2, student: "Jane Smith", date: "2023-08-12", status: "Approved" },
    { id: 3, student: "Robert Johnson", date: "2023-08-10", status: "Rejected" }
  ]);
  
  const [upcomingHolidays, setUpcomingHolidays] = useState([
    { id: 1, name: "Independence Day", date: "2023-08-15" },
    { id: 2, name: "Janmashtami", date: "2023-09-07" },
    { id: 3, name: "Gandhi Jayanti", date: "2023-10-02" }
  ]);

  // Simulate loading data
  useEffect(() => {
    // In a real app, this would be an API call
    const timer = setTimeout(() => {
      // Data would be set here from API response
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

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "success";
      case "Pending": return "warning";
      case "Rejected": return "danger";
      default: return "secondary";
    }
  };

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="text-primary mb-1">Admin Dashboard</h1>
          <p className="text-muted">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <button 
            className="btn btn-primary d-flex align-items-center shadow-sm"
            onClick={() => navigate('/admin/class-teacher/notices')}
            style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
          >
            <FaPlus className="me-2" /> Add Notice
          </button>
          <button 
            className="btn btn-outline-primary d-flex align-items-center"
            onClick={() => navigate('/admin/class-teacher/leave')}
            style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
          >
            <FaUsers className="me-2" /> Manage Leaves
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-primary bg-opacity-10 rounded-circle p-3">
                <FaClipboardList className="text-primary" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Total Notices</h6>
                <h3 className="mb-0">{stats.totalNotices}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-warning bg-opacity-10 rounded-circle p-3">
                <FaUsers className="text-warning" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Pending Leaves</h6>
                <h3 className="mb-0">{stats.pendingLeaves}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-info bg-opacity-10 rounded-circle p-3">
                <FaCalendarAlt className="text-info" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Upcoming Holidays</h6>
                <h3 className="mb-0">{stats.upcomingHolidays}</h3>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-xl-3 col-md-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px', transition: 'all 0.3s ease' }}>
            <div className="card-body d-flex align-items-center">
              <div className="flex-shrink-0 bg-success bg-opacity-10 rounded-circle p-3">
                <FaUserGraduate className="text-success" style={{ fontSize: '1.5rem' }} />
              </div>
              <div className="ms-3">
                <h6 className="text-muted mb-1">Active Students</h6>
                <h3 className="mb-0">{stats.activeStudents}</h3>
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
                  <FaClipboardList className="text-primary me-2" />
                  Recent Notices
                </h5>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate('/admin/class-teacher/notices')}
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
                  <FaClipboardList className="text-muted mb-2" style={{ fontSize: '2rem' }} />
                  <p className="text-muted">No notices found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Leave Applications */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <FaUsers className="text-warning me-2" />
                  Recent Leave Applications
                </h5>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate('/admin/class-teacher/leave')}
                >
                  View All <FaArrowRight className="ms-1" size={12} />
                </button>
              </div>
            </div>
            <div className="card-body">
              {recentLeaves.length > 0 ? (
                <div className="list-group list-group-flush">
                  {recentLeaves.map((leave) => (
                    <div key={leave.id} className="list-group-item px-0 border-bottom">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{leave.student}</h6>
                          <div className="d-flex align-items-center text-muted small">
                            <FaCalendarAlt className="me-1" size={12} />
                            <span>{formatDate(leave.date)}</span>
                          </div>
                        </div>
                        <span className={`badge bg-${getStatusColor(leave.status)}`} style={{ borderRadius: '20px' }}>
                          {leave.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaUsers className="text-muted mb-2" style={{ fontSize: '2rem' }} />
                  <p className="text-muted">No leave applications found</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0 d-flex align-items-center">
                  <FaCalendarAlt className="text-info me-2" />
                  Upcoming Holidays
                </h5>
                <button 
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => navigate('/admin/class-teacher/holidays')}
                >
                  View All <FaArrowRight className="ms-1" size={12} />
                </button>
              </div>
            </div>
            <div className="card-body">
              {upcomingHolidays.length > 0 ? (
                <div className="list-group list-group-flush">
                  {upcomingHolidays.map((holiday) => (
                    <div key={holiday.id} className="list-group-item px-0 border-bottom">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-0">{holiday.name}</h6>
                        <div className="d-flex align-items-center text-muted small">
                          <FaCalendarAlt className="me-1" size={12} />
                          <span>{formatDate(holiday.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <FaCalendarAlt className="text-muted mb-2" style={{ fontSize: '2rem' }} />
                  <p className="text-muted">No upcoming holidays</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '12px' }}>
            <div className="card-header bg-white border-0 py-3">
              <h5 className="card-title mb-0 d-flex align-items-center">
                <FaChartBar className="text-success me-2" />
                Quick Actions
              </h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-3">
                <button 
                  className="btn btn-outline-primary d-flex align-items-center justify-content-between p-3"
                  onClick={() => navigate('/admin/class-teacher/notices')}
                  style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                >
                  <div className="d-flex align-items-center">
                    <FaClipboardList className="me-3" />
                    <span>Manage Notices</span>
                  </div>
                  <FaArrowRight />
                </button>
                
                <button 
                  className="btn btn-outline-warning d-flex align-items-center justify-content-between p-3"
                  onClick={() => navigate('/admin/class-teacher/leave')}
                  style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                >
                  <div className="d-flex align-items-center">
                    <FaUsers className="me-3" />
                    <span>Leave Applications</span>
                  </div>
                  <FaArrowRight />
                </button>
                
                <button 
                  className="btn btn-outline-info d-flex align-items-center justify-content-between p-3"
                  onClick={() => navigate('/admin/class-teacher/holidays')}
                  style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
                >
                  <div className="d-flex align-items-center">
                    <FaCalendarAlt className="me-3" />
                    <span>Holiday Calendar</span>
                  </div>
                  <FaArrowRight />
                </button>
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