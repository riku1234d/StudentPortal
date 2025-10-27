import React, { useState } from "react";
import { FaCheck, FaTimes, FaSearch, FaFilter, FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaIdCard, FaCommentAlt } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function LeaveNoticeManagement() {
  const [leaveNotices, setLeaveNotices] = useState([
    {
      id: 1,
      studentId: "23CSE200",
      studentName: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "9876543210",
      fromDate: "2023-08-15",
      toDate: "2023-08-17",
      reason: "Family function out of station",
      status: "Pending",
      submittedDate: "2023-08-10",
      additionalInfo: "Will be traveling to hometown for cousin's wedding"
    },
    {
      id: 2,
      studentId: "23CSE201",
      studentName: "Priya Patel",
      email: "priya.patel@example.com",
      phone: "9876543211",
      fromDate: "2023-08-20",
      toDate: "2023-08-22",
      reason: "Medical appointment",
      status: "Approved",
      submittedDate: "2023-08-15",
      additionalInfo: "Doctor's appointment at City Hospital"
    },
    {
      id: 3,
      studentId: "23CSE202",
      studentName: "Amit Kumar",
      email: "amit.kumar@example.com",
      phone: "9876543212",
      fromDate: "2023-08-25",
      toDate: "2023-08-26",
      reason: "Personal work",
      status: "Rejected",
      submittedDate: "2023-08-18",
      additionalInfo: "Need to attend to urgent family matter"
    },
    {
      id: 4,
      studentId: "23CSE203",
      studentName: "Sneha Reddy",
      email: "sneha.reddy@example.com",
      phone: "9876543213",
      fromDate: "2023-08-28",
      toDate: "2023-08-30",
      reason: "Attending conference",
      status: "Pending",
      submittedDate: "2023-08-20",
      additionalInfo: "National Technical Conference on AI and Machine Learning"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [actionComment, setActionComment] = useState("");

  const handleStatusChange = (id, status) => {
    setLeaveNotices(leaveNotices.map(notice => 
      notice.id === id ? { ...notice, status } : notice
    ));
    
    // Close detail modal if open
    if (showDetailModal) {
      setShowDetailModal(false);
      setActionComment("");
    }
  };

  const openDetailModal = (notice) => {
    setSelectedNotice(notice);
    setShowDetailModal(true);
    setActionComment("");
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Approved": return "success";
      case "Rejected": return "danger";
      case "Pending": return "warning";
      default: return "secondary";
    }
  };

  // Filter leave notices based on search term and status
  const filteredNotices = leaveNotices.filter(notice => {
    const matchesSearch = notice.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || notice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Count notices by status
  const pendingCount = leaveNotices.filter(n => n.status === "Pending").length;
  const approvedCount = leaveNotices.filter(n => n.status === "Approved").length;
  const rejectedCount = leaveNotices.filter(n => n.status === "Rejected").length;

  return (
    <div className="container py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="text-primary mb-1">Student Leave Notices</h1>
          <p className="text-muted">Review and manage leave applications submitted by students</p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <div className="badge bg-warning text-dark p-2">
            Pending: {pendingCount}
          </div>
          <div className="badge bg-success p-2">
            Approved: {approvedCount}
          </div>
          <div className="badge bg-danger p-2">
            Rejected: {rejectedCount}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="row mb-4">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className="input-group" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <span className="input-group-text bg-white border-end-0">
              <FaSearch className="text-muted" />
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Search by student name, ID, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderLeft: 'none' }}
            />
          </div>
        </div>
        <div className="col-md-4">
          <div className="input-group" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <span className="input-group-text bg-white border-end-0">
              <FaFilter className="text-muted" />
            </span>
            <select
              className="form-select border-start-0"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ borderLeft: 'none' }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave Notices Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
        <div className="card-body p-0">
          {filteredNotices.length === 0 ? (
            <div className="text-center py-5">
              <FaCommentAlt className="text-muted mb-3" style={{ fontSize: '3rem' }} />
              <h5 className="card-title text-muted">No Leave Notices Found</h5>
              <p className="text-muted">
                {searchTerm || filterStatus !== "All" 
                  ? "Try adjusting your search or filter criteria" 
                  : "No leave notices have been submitted yet"}
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Student</th>
                    <th scope="col">Leave Period</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Status</th>
                    <th scope="col" className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotices.map((notice) => (
                    <tr key={notice.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" 
                               style={{ width: '40px', height: '40px' }}>
                            <FaUser className="text-primary" />
                          </div>
                          <div>
                            <div className="fw-semibold">{notice.studentName}</div>
                            <div className="text-muted small">{notice.studentId}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <FaCalendarAlt className="text-primary me-2" />
                          <div>
                            <div>{formatDate(notice.fromDate)} - {formatDate(notice.toDate)}</div>
                            <div className="text-muted small">
                              {Math.ceil((new Date(notice.toDate) - new Date(notice.fromDate)) / (1000 * 60 * 60 * 24) + 1)} day(s)
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>{notice.reason}</div>
                        <div className="text-muted small">
                          Submitted: {formatDate(notice.submittedDate)}
                        </div>
                      </td>
                      <td>
                        <span className={`badge bg-${getStatusColor(notice.status)}`} style={{ borderRadius: '20px' }}>
                          {notice.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => openDetailModal(notice)}
                          title="View Details"
                        >
                          View
                        </button>
                        {notice.status === "Pending" && (
                          <>
                            <button 
                              className="btn btn-sm btn-outline-success me-2"
                              onClick={() => handleStatusChange(notice.id, "Approved")}
                              title="Approve"
                            >
                              <FaCheck />
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleStatusChange(notice.id, "Rejected")}
                              title="Reject"
                            >
                              <FaTimes />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedNotice && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{ borderRadius: '12px' }}>
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title">Leave Notice Details</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => {
                    setShowDetailModal(false);
                    setActionComment("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" 
                           style={{ width: '60px', height: '60px' }}>
                        <FaUser className="text-primary" style={{ fontSize: '24px' }} />
                      </div>
                      <div>
                        <h5 className="mb-0">{selectedNotice.studentName}</h5>
                        <div className="text-muted">{selectedNotice.studentId}</div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-muted small mb-1">Email</div>
                      <div className="d-flex align-items-center">
                        <FaEnvelope className="text-primary me-2" />
                        <span>{selectedNotice.email}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="text-muted small mb-1">Phone</div>
                      <div className="d-flex align-items-center">
                        <FaPhone className="text-primary me-2" />
                        <span>{selectedNotice.phone}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card bg-light border-0 h-100" style={{ borderRadius: '8px' }}>
                      <div className="card-body">
                        <h6 className="card-title mb-3">Leave Information</h6>
                        
                        <div className="mb-3">
                          <div className="text-muted small mb-1">Leave Period</div>
                          <div className="d-flex align-items-center">
                            <FaCalendarAlt className="text-primary me-2" />
                            <span>{formatDate(selectedNotice.fromDate)} - {formatDate(selectedNotice.toDate)}</span>
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-muted small mb-1">Duration</div>
                          <div>
                            {Math.ceil((new Date(selectedNotice.toDate) - new Date(selectedNotice.fromDate)) / (1000 * 60 * 60 * 24) + 1)} day(s)
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <div className="text-muted small mb-1">Status</div>
                          <span className={`badge bg-${getStatusColor(selectedNotice.status)}`} style={{ borderRadius: '20px' }}>
                            {selectedNotice.status}
                          </span>
                        </div>
                        
                        <div>
                          <div className="text-muted small mb-1">Submitted On</div>
                          <div>{formatDate(selectedNotice.submittedDate)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-muted small mb-1">Reason for Leave</div>
                  <div className="fw-semibold">{selectedNotice.reason}</div>
                </div>
                
                <div>
                  <div className="text-muted small mb-1">Additional Information</div>
                  <div>{selectedNotice.additionalInfo}</div>
                </div>
                
                {selectedNotice.status === "Pending" && (
                  <div className="mt-4 pt-4 border-top">
                    <div className="mb-3">
                      <label htmlFor="actionComment" className="form-label fw-semibold">
                        Comments (Optional)
                      </label>
                      <textarea
                        className="form-control"
                        id="actionComment"
                        rows="3"
                        value={actionComment}
                        onChange={(e) => setActionComment(e.target.value)}
                        placeholder="Add any comments for the student..."
                        style={{ borderRadius: '8px' }}
                      ></textarea>
                    </div>
                    
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleStatusChange(selectedNotice.id, "Rejected")}
                      >
                        <FaTimes className="me-2" /> Reject
                      </button>
                      <button 
                        className="btn btn-success"
                        onClick={() => handleStatusChange(selectedNotice.id, "Approved")}
                      >
                        <FaCheck className="me-2" /> Approve
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .form-control:focus, .form-select:focus {
            border-color: #4a89dc;
            box-shadow: 0 0 0 0.25rem rgba(74, 137, 220, 0.25);
          }
          
          .btn-primary {
            background-color: #4a89dc;
            border-color: #4a89dc;
          }
          
          .btn-primary:hover {
            background-color: #3a79cc;
            border-color: #3a79cc;
          }
          
          .table-hover tbody tr:hover {
            background-color: rgba(74, 137, 220, 0.05);
          }
          
          .modal.show {
            display: block !important;
          }
        `}
      </style>
    </div>
  );
}