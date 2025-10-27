import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBullhorn, FaCalendarAlt, FaUserTie, FaUniversity, FaStickyNote, FaSearch, FaFilter, FaRegClock, FaChevronRight, FaMapMarkerAlt, FaBell, FaBook, FaChalkboardTeacher, FaCalendarCheck, FaExclamationTriangle, FaInfoCircle, FaTimes } from "react-icons/fa";

export default function NoticeBoard() {
  const [notices] = useState([
    {
      id: 1,
      title: "Holiday Notice",
      date: "02 Sept 2025",
      description:
        "This is to inform all students that the college will remain closed on 5th September on account of Teacher's Day celebration.",
      priority: "high",
      category: "holiday",
      postedBy: "Administration Office",
      expiry: "10 Sept 2025",
      details: "The college will remain closed on 5th September 2025 for Teacher's Day celebration. All academic activities are suspended for the day. Students and staff are requested to note the holiday and plan accordingly. The college will resume normal operations on 6th September 2025."
    },
    {
      id: 2,
      title: "Mid-Semester Examination",
      date: "28 Aug 2025",
      description:
        "The Mid-Semester Examinations will commence from 10th September 2025. Detailed timetable will be displayed on the college website and notice board. Students are advised to collect their admit cards from the examination office.",
      priority: "medium",
      category: "examination",
      postedBy: "Controller of Examinations",
      expiry: "15 Sept 2025",
      details: "The Mid-Semester Examinations are scheduled to begin from 10th September 2025. The detailed timetable has been displayed on the college website and notice boards. All students must collect their admit cards from the examination office before the examination date. Students are advised to prepare well and follow all examination guidelines."
    },
    {
      id: 3,
      title: "Workshop on AI & ML",
      date: "20 Aug 2025",
      description:
        "A workshop on Artificial Intelligence & Machine Learning will be conducted on 8th September 2025 in Lab-2, organized by the Department of CSE. Registration is mandatory and limited seats are available.",
      priority: "medium",
      category: "workshop",
      postedBy: "Department of CSE",
      expiry: "05 Sept 2025",
      details: "The Department of Computer Science Engineering is organizing a workshop on Artificial Intelligence & Machine Learning on 8th September 2025 in Lab-2. The workshop will cover fundamental concepts and practical applications of AI and ML. Registration is mandatory due to limited seats. Interested students should register at the department office by 5th September 2025."
    }
  ]);

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalNotice, setModalNotice] = useState(null);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'holiday': return <FaCalendarCheck className="text-warning" />;
      case 'examination': return <FaBook className="text-info" />;
      case 'workshop': return <FaChalkboardTeacher className="text-success" />;
      default: return <FaBell className="text-primary" />;
    }
  };

  const getCategoryColor = (priority) => {
    switch(priority) {
      case 'high': return 'danger';
      case 'medium': return 'primary';
      default: return 'success';
    }
  };

  const getCategoryName = (category) => {
    switch(category) {
      case 'holiday': return 'Holiday';
      case 'examination': return 'Examination';
      case 'workshop': return 'Workshop';
      default: return 'General';
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || notice.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleNoticeClick = (notice) => {
    setModalNotice(notice);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalNotice(null);
  };

  return (
    <div className="container-fluid py-4" style={{ 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f0f2f5",
      minHeight: "100vh"
    }}>
      <style>
        {`
          .notice-board {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .main-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 2rem;
            margin-bottom: 2rem;
            color: white;
            box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
          }
          
          .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .header-title h1 {
            margin: 0;
            font-weight: 700;
            font-size: 2.2rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .header-title p {
            margin: 0;
            opacity: 0.9;
            font-size: 1rem;
          }
          
          .header-icon {
            background: rgba(255, 255, 255, 0.2);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.8rem;
            backdrop-filter: blur(10px);
          }
          
          .controls {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
          
          .controls-row {
            display: flex;
            gap: 1rem;
            align-items: center;
            flex-wrap: wrap;
          }
          
          .search-container {
            flex: 1;
            min-width: 250px;
            position: relative;
          }
          
          .search-input {
            width: 100%;
            padding: 0.75rem 1rem 0.75rem 3rem;
            border: 1px solid #e2e8f0;
            border-radius: 50px;
            font-size: 0.95rem;
            background: #f8fafc;
            transition: all 0.3s ease;
          }
          
          .search-input:focus {
            outline: none;
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
          
          .search-icon {
            position: absolute;
            left: 1.2rem;
            top: 50%;
            transform: translateY(-50%);
            color: #a0aec0;
          }
          
          .filter-pills {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          
          .filter-pill {
            padding: 0.5rem 1.2rem;
            border-radius: 50px;
            border: 1px solid #e2e8f0;
            background: white;
            color: #4a5568;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .filter-pill:hover {
            border-color: #667eea;
            color: #667eea;
          }
          
          .filter-pill.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
          }
          
          .notice-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
          }
          
          .notice-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;
            border: 1px solid #f0f2f5;
            cursor: pointer;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .notice-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          
          .notice-card-header {
            padding: 1.5rem;
            border-bottom: 1px solid #f0f2f5;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          }
          
          .notice-card-body {
            padding: 1.5rem;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .notice-card-footer {
            padding: 1rem 1.5rem;
            background: #f8fafc;
            border-top: 1px solid #f0f2f5;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .notice-top-row {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
          }
          
          .notice-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin: 0;
            line-height: 1.3;
          }
          
          .notice-priority {
            padding: 0.25rem 0.75rem;
            border-radius: 50px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .notice-meta-row {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1rem;
            color: #718096;
            font-size: 0.9rem;
          }
          
          .notice-meta-item {
            display: flex;
            align-items: center;
            gap: 0.4rem;
          }
          
          .notice-content {
            color: #4a5568;
            line-height: 1.6;
            flex: 1;
          }
          
          .notice-category {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.4rem 0.8rem;
            background: #edf2f7;
            border-radius: 8px;
            font-weight: 500;
            font-size: 0.85rem;
          }
          
          .notice-expand {
            color: #667eea;
            font-size: 1.2rem;
            transition: transform 0.3s ease;
          }
          
          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          }
          
          .empty-icon {
            font-size: 4rem;
            color: #cbd5e0;
            margin-bottom: 1rem;
          }
          
          .board-footer {
            text-align: center;
            padding: 2rem 0;
            color: #718096;
            font-style: italic;
          }
          
          .modal-content {
            border-radius: 16px;
            border: none;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          }
          
          .modal-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-top-left-radius: 16px;
            border-top-right-radius: 16px;
            border: none;
            padding: 1.5rem;
          }
          
          .modal-title {
            font-weight: 700;
            font-size: 1.5rem;
          }
          
          .modal-body {
            padding: 2rem;
          }
          
          .modal-footer {
            border: none;
            padding: 1.5rem;
            background: #f8fafc;
            border-bottom-left-radius: 16px;
            border-bottom-right-radius: 16px;
          }
          
          .detail-item {
            margin-bottom: 1rem;
          }
          
          .detail-label {
            font-weight: 600;
            color: #4a5568;
            margin-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          
          .detail-content {
            color: #2d3748;
            background: #f8fafc;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
        `}
      </style>

      <div className="notice-board">
        <div className="main-header">
          <div className="header-content">
            <div className="header-title">
              <h1>University Notice Board</h1>
              <p>GIET University, Gunupur • Stay informed with latest announcements</p>
            </div>
            <div className="header-icon">
              <FaBullhorn />
            </div>
          </div>
        </div>
        
        <div className="controls">
          <div className="controls-row">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                className="search-input"
                placeholder="Search notices by title or content..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-pills">
              <button 
                className={`filter-pill ${filterCategory === "all" ? "active" : ""}`}
                onClick={() => setFilterCategory("all")}
              >
                <FaFilter /> All Notices
              </button>
              <button 
                className={`filter-pill ${filterCategory === "holiday" ? "active" : ""}`}
                onClick={() => setFilterCategory("holiday")}
              >
                <FaCalendarCheck /> Holidays
              </button>
              <button 
                className={`filter-pill ${filterCategory === "examination" ? "active" : ""}`}
                onClick={() => setFilterCategory("examination")}
              >
                <FaBook /> Exams
              </button>
              <button 
                className={`filter-pill ${filterCategory === "workshop" ? "active" : ""}`}
                onClick={() => setFilterCategory("workshop")}
              >
                <FaChalkboardTeacher /> Workshops
              </button>
            </div>
          </div>
        </div>
        
        {filteredNotices.length > 0 ? (
          <div className="notice-grid">
            {filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                className="notice-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleNoticeClick(notice)}
              >
                <div className="notice-card-header">
                  <div className="notice-top-row">
                    <h3 className="notice-title">{notice.title}</h3>
                    <span className={`notice-priority badge bg-${getCategoryColor(notice.priority)}`}>
                      {notice.priority}
                    </span>
                  </div>
                  
                  <div className="notice-meta-row">
                    <div className="notice-meta-item">
                      <FaRegClock />
                      {notice.date}
                    </div>
                    <div className="notice-meta-item">
                      <FaUserTie />
                      {notice.postedBy}
                    </div>
                  </div>
                </div>
                
                <div className="notice-card-body">
                  <div className="notice-content">
                    {notice.description.length > 120 
                      ? `${notice.description.substring(0, 120)}...` 
                      : notice.description
                    }
                  </div>
                </div>
                
                <div className="notice-card-footer">
                  <div className="notice-category">
                    {getCategoryIcon(notice.category)}
                    {getCategoryName(notice.category)}
                  </div>
                  <FaChevronRight className="notice-expand" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <FaInfoCircle />
            </div>
            <h3>No Notices Found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
        
        <div className="board-footer">
          <p>— By Order of the Principal —</p>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {modalNotice && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {getCategoryIcon(modalNotice.category)}
                  {modalNotice.title}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="detail-item">
                  <div className="detail-label">
                    <FaRegClock /> Date Posted
                  </div>
                  <div className="detail-content">{modalNotice.date}</div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-label">
                    <FaUserTie /> Posted By
                  </div>
                  <div className="detail-content">{modalNotice.postedBy}</div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-label">
                    <FaCalendarAlt /> Expires On
                  </div>
                  <div className="detail-content">{modalNotice.expiry}</div>
                </div>
                
                <div className="detail-item">
                  <div className="detail-label">
                    <FaStickyNote /> Details
                  </div>
                  <div className="detail-content">{modalNotice.details}</div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
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