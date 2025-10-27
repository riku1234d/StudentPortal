import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaCalendarAlt, FaTimes, FaSearch, FaBell, FaFilter, FaEye } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NoticeManagement() {
  const [notices, setNotices] = useState([
    {
      id: 1,
      title: "Holiday Announcement",
      content: "The college will remain closed on 15th August for Independence Day. All administrative offices will also be closed.",
      date: "2023-08-10",
      author: "Admin",
      priority: "High"
    },
    {
      id: 2,
      title: "Examination Schedule",
      content: "Mid-term examinations will commence from 25th August. All students are requested to prepare accordingly.",
      date: "2023-08-05",
      author: "Admin",
      priority: "Medium"
    },
    {
      id: 3,
      title: "Library Hours",
      content: "The library will be open from 9 AM to 8 PM during the examination period.",
      date: "2023-08-01",
      author: "Admin",
      priority: "Low"
    }
  ]);

  const [newNotice, setNewNotice] = useState({
    title: "",
    content: "",
    date: "",
    author: "Admin",
    priority: "Medium"
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showNoticeDetail, setShowNoticeDetail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotice({
      ...newNotice,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing notice
      setNotices(notices.map(notice => 
        notice.id === editingId ? { ...newNotice, id: editingId } : notice
      ));
      setEditingId(null);
    } else {
      // Add new notice
      const noticeToAdd = {
        ...newNotice,
        id: notices.length > 0 ? Math.max(...notices.map(n => n.id)) + 1 : 1,
        date: newNotice.date || new Date().toISOString().split('T')[0]
      };
      setNotices([...notices, noticeToAdd]);
    }
    
    // Reset form
    setNewNotice({
      title: "",
      content: "",
      date: "",
      author: "Admin",
      priority: "Medium"
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setNotices(notices.filter(notice => notice.id !== id));
  };

  const handleEdit = (notice) => {
    setNewNotice({
      title: notice.title,
      content: notice.content,
      date: notice.date,
      author: notice.author,
      priority: notice.priority
    });
    setEditingId(notice.id);
    setShowForm(true);
  };

  const handleViewNotice = (notice) => {
    setSelectedNotice(notice);
    setShowNoticeDetail(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "danger";
      case "Medium": return "warning";
      case "Low": return "info";
      default: return "secondary";
    }
  };

  // Filter notices based on search term and priority
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          notice.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "All" || notice.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  return (
    <div className="container py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div className="mb-3 mb-md-0">
          <h1 className="text-primary mb-1">Notice Management</h1>
          <p className="text-muted">Create, edit, and manage important announcements</p>
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center shadow-sm"
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setNewNotice({
                title: "",
                content: "",
                date: "",
                author: "Admin",
                priority: "Medium"
              });
              setEditingId(null);
            }
          }}
          style={{ borderRadius: '8px', transition: 'all 0.3s ease' }}
        >
          {showForm ? 
            <>
              <FaTimes className="me-2" /> Cancel
            </> : 
            <>
              <FaPlus className="me-2" /> Add New Notice
            </>
          }
        </button>
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
              placeholder="Search notices..."
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
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              style={{ borderLeft: 'none' }}
            >
              <option value="All">All Priorities</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add/Edit Notice Form */}
      {showForm && (
        <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: '12px' }}>
          <div className="card-body p-4">
            <div className="d-flex align-items-center mb-4">
              <FaBell className="text-primary me-2" />
              <h5 className="card-title mb-0">{editingId ? "Edit Notice" : "Create New Notice"}</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-8 mb-3 mb-md-0">
                  <label htmlFor="title" className="form-label fw-semibold">Notice Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newNotice.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter notice title"
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="priority" className="form-label fw-semibold">Priority</label>
                  <select
                    className="form-select"
                    id="priority"
                    name="priority"
                    value={newNotice.priority}
                    onChange={handleInputChange}
                    style={{ borderRadius: '8px' }}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="content" className="form-label fw-semibold">Notice Content</label>
                <textarea
                  className="form-control"
                  id="content"
                  name="content"
                  rows="4"
                  value={newNotice.content}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter detailed notice content"
                  style={{ borderRadius: '8px' }}
                ></textarea>
              </div>
              
              <div className="row mb-4">
                <div className="col-md-6">
                  <label htmlFor="date" className="form-label fw-semibold">Publish Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={newNotice.date}
                    onChange={handleInputChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="author" className="form-label fw-semibold">Author</label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={newNotice.author}
                    onChange={handleInputChange}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              </div>
              
              <div className="d-flex justify-content-end">
                <button 
                  type="submit" 
                  className="btn btn-primary px-4"
                  style={{ borderRadius: '8px' }}
                >
                  {editingId ? "Update Notice" : "Publish Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notices Grid */}
      <div className="row">
        {filteredNotices.length === 0 ? (
          <div className="col-12">
            <div className="card border-0 shadow-sm text-center py-5" style={{ borderRadius: '12px' }}>
              <div className="card-body">
                <FaBell className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                <h5 className="card-title text-muted">No Notices Found</h5>
                <p className="text-muted">
                  {searchTerm || filterPriority !== "All" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Click 'Add New Notice' to create your first notice"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          filteredNotices.map((notice) => (
            <div key={notice.id} className="col-lg-6 col-xl-4 mb-4">
              <div 
                className="card h-100 border-0 shadow-sm hover-card" 
                style={{ borderRadius: '12px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                onClick={() => handleViewNotice(notice)}
              >
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className={`badge bg-${getPriorityColor(notice.priority)}`} style={{ borderRadius: '20px' }}>
                      {notice.priority} Priority
                    </span>
                    <div className="dropdown" onClick={(e) => e.stopPropagation()}>
                      <button 
                        className="btn btn-sm text-muted" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center" 
                            onClick={() => handleViewNotice(notice)}
                          >
                            <FaEye className="me-2 text-primary" /> View
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center" 
                            onClick={() => handleEdit(notice)}
                          >
                            <FaEdit className="me-2 text-primary" /> Edit
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item d-flex align-items-center text-danger" 
                            onClick={() => handleDelete(notice.id)}
                          >
                            <FaTrash className="me-2" /> Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <h5 className="card-title fw-bold mb-3">{notice.title}</h5>
                  <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.95rem' }}>
                    {notice.content.length > 120 
                      ? `${notice.content.substring(0, 120)}...` 
                      : notice.content}
                  </p>
                  
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                    <div className="d-flex align-items-center text-muted small">
                      <FaCalendarAlt className="me-1" />
                      <span>{formatDate(notice.date)}</span>
                    </div>
                    <span className="text-muted small">By {notice.author}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className={`modal fade ${showNoticeDetail ? 'show' : ''}`} 
             style={{ display: showNoticeDetail ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.5)' }}
             tabIndex="-1" 
             onClick={() => setShowNoticeDetail(false)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content border-0 shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="modal-header border-0 pb-0">
                <div className="d-flex align-items-center">
                  <span className={`badge bg-${getPriorityColor(selectedNotice.priority)} me-3`} style={{ borderRadius: '20px' }}>
                    {selectedNotice.priority} Priority
                  </span>
                  <h5 className="modal-title fw-bold">{selectedNotice.title}</h5>
                </div>
                <button type="button" className="btn-close" onClick={() => setShowNoticeDetail(false)}></button>
              </div>
              <div className="modal-body pt-3">
                <div className="mb-4">
                  <p className="mb-0" style={{ lineHeight: '1.6' }}>{selectedNotice.content}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="d-flex align-items-center text-muted">
                    <FaCalendarAlt className="me-2" />
                    <span>{formatDate(selectedNotice.date)}</span>
                  </div>
                  <span className="text-muted">By {selectedNotice.author}</span>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button 
                  type="button" 
                  className="btn btn-outline-primary"
                  onClick={() => {
                    handleEdit(selectedNotice);
                    setShowNoticeDetail(false);
                  }}
                >
                  <FaEdit className="me-2" /> Edit Notice
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(selectedNotice.id);
                    setShowNoticeDetail(false);
                  }}
                >
                  <FaTrash className="me-2" /> Delete Notice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>
        {`
          .hover-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
          }
          
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
        `}
      </style>
    </div>
  );
}