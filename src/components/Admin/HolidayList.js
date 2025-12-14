import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaSearch, FaCalendarAlt, FaFilter, FaSun, FaFlag, FaGraduationCap, FaChevronLeft, FaChevronRight, FaList, FaTh } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HolidayList() {
  const [holidays, setHolidays] = useState([
    {
      id: 1,
      name: "Republic Day",
      date: "2024-01-26",
      day: "Friday",
      type: "National",
      description: "Celebration of the Indian Constitution"
    },
    {
      id: 2,
      name: "Makar Sankranti / Pongal",
      date: "2024-01-15",
      day: "Monday",
      type: "Festival",
      description: "Harvest festival celebrated across India"
    },
    {
      id: 3,
      name: "Republic Day Holiday",
      date: "2024-01-27",
      day: "Saturday",
      type: "National",
      description: "Compensatory holiday for Republic Day"
    }
  ]);

  const [newHoliday, setNewHoliday] = useState({
    name: "",
    date: "",
    type: "National",
    description: ""
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [viewMode, setViewMode] = useState("cards"); // "cards" or "calendar"

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday({
      ...newHoliday,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dateObj = new Date(newHoliday.date);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dateObj.getDay()];
    
    if (editingId) {
      setHolidays(holidays.map(holiday => 
        holiday.id === editingId ? { ...newHoliday, id: editingId, day: dayName } : holiday
      ));
      setEditingId(null);
    } else {
      const holidayToAdd = {
        ...newHoliday,
        id: holidays.length > 0 ? Math.max(...holidays.map(h => h.id)) + 1 : 1,
        day: dayName
      };
      setHolidays([...holidays, holidayToAdd]);
      setCurrentMonth(dateObj.getMonth());
      setCurrentYear(dateObj.getFullYear());
    }
    
    setNewHoliday({
      name: "",
      date: "",
      type: "National",
      description: ""
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setHolidays(holidays.filter(holiday => holiday.id !== id));
  };

  const handleEdit = (holiday) => {
    setNewHoliday({
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      description: holiday.description
    });
    setEditingId(holiday.id);
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "National": return "primary";
      case "Festival": return "success";
      case "Religious": return "warning";
      case "College": return "info";
      default: return "secondary";
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case "National": return <FaFlag className="me-1" />;
      case "Festival": return <FaSun className="me-1" />;
      case "Religious": return <FaCalendarAlt className="me-1" />;
      case "College": return <FaGraduationCap className="me-1" />;
      default: return <FaCalendarAlt className="me-1" />;
    }
  };

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || holiday.type === filterType;
    const holidayDate = new Date(holiday.date);
    const matchesMonth = holidayDate.getMonth() === currentMonth && holidayDate.getFullYear() === currentYear;
    return matchesSearch && matchesType && matchesMonth;
  });

  const changeMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getMonthName = (monthIndex) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const holiday = holidays.find(h => h.date === dateStr);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${holiday ? 'has-holiday' : ''}`}
          style={{ 
            backgroundColor: holiday ? `var(--bs-${getTypeColor(holiday.type)}-bg-subtle)` : 'transparent',
            borderLeft: holiday ? `3px solid var(--bs-${getTypeColor(holiday.type)})` : 'none'
          }}
        >
          <div className="day-number">{day}</div>
          {holiday && (
            <div className="holiday-indicator" title={holiday.name}>
              {getTypeIcon(holiday.type)}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-4 mb-4">
          <div className="card shadow-sm border-0 h-100" style={{ borderRadius: '12px' }}>
            <div className="card-body p-4">
              <h4 className="text-primary mb-4">Holiday Calendar</h4>
              
              {/* Add Holiday Button */}
              <button 
                className="btn btn-primary w-100 mb-4 d-flex align-items-center justify-content-center"
                onClick={() => {
                  setShowForm(!showForm);
                  if (!showForm) {
                    setNewHoliday({
                      name: "",
                      date: "",
                      type: "National",
                      description: ""
                    });
                    setEditingId(null);
                  }
                }}
              >
                {showForm ? 
                  <>
                    <FaTimes className="me-2" /> Cancel
                  </> : 
                  <>
                    <FaPlus className="me-2" /> Add Holiday
                  </>
                }
              </button>
              
              {/* Search */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Search Holidays</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaSearch className="text-muted" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Filter */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Filter by Type</label>
                <div className="input-group">
                  <span className="input-group-text bg-white">
                    <FaFilter className="text-muted" />
                  </span>
                  <select
                    className="form-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="All">All Types</option>
                    <option value="National">National</option>
                    <option value="Festival">Festival</option>
                    <option value="Religious">Religious</option>
                    <option value="College">College</option>
                  </select>
                </div>
              </div>
              
              {/* Month Navigation */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Select Month</label>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-outline-primary me-2"
                    onClick={() => changeMonth('prev')}
                    style={{ borderRadius: '50%', width: '36px', height: '36px', padding: '0' }}
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="text-center flex-grow-1">
                    <div className="fw-bold">{getMonthName(currentMonth)} {currentYear}</div>
                  </div>
                  <button 
                    className="btn btn-outline-primary ms-2"
                    onClick={() => changeMonth('next')}
                    style={{ borderRadius: '50%', width: '36px', height: '36px', padding: '0' }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              
              {/* View Toggle */}
              <div className="mb-4">
                <label className="form-label fw-semibold">View Mode</label>
                <div className="d-flex">
                  <button 
                    className={`btn flex-grow-1 me-2 ${viewMode === 'cards' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('cards')}
                  >
                    <FaList className="me-1" /> List
                  </button>
                  <button 
                    className={`btn flex-grow-1 ${viewMode === 'calendar' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setViewMode('calendar')}
                  >
                    <FaTh className="me-1" /> Calendar
                  </button>
                </div>
              </div>
              
              {/* Stats */}
              <div className="mt-4 pt-4 border-top">
                <h6 className="text-muted mb-3">Holiday Statistics</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Total Holidays:</span>
                  <span className="fw-bold">{holidays.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>This Month:</span>
                  <span className="fw-bold">{filteredHolidays.length}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>National Holidays:</span>
                  <span className="fw-bold">{holidays.filter(h => h.type === 'National').length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="col-lg-9 col-md-8">
          {/* Add/Edit Holiday Form */}
          {showForm && (
            <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: '12px' }}>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-4">
                  <FaCalendarAlt className="text-primary me-2" />
                  <h5 className="card-title mb-0">{editingId ? "Edit Holiday" : "Add New Holiday"}</h5>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">Holiday Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={newHoliday.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter holiday name"
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="date" className="form-label fw-semibold">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={newHoliday.date}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor="type" className="form-label fw-semibold">Type</label>
                      <select
                        className="form-select"
                        id="type"
                        name="type"
                        value={newHoliday.type}
                        onChange={handleInputChange}
                      >
                        <option value="National">National</option>
                        <option value="Festival">Festival</option>
                        <option value="Religious">Religious</option>
                        <option value="College">College</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="description" className="form-label fw-semibold">Description</label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="2"
                        value={newHoliday.description}
                        onChange={handleInputChange}
                        placeholder="Enter holiday description"
                      ></textarea>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                      <button 
                        type="submit" 
                        className="btn btn-primary px-4"
                      >
                        {editingId ? "Update Holiday" : "Add Holiday"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Calendar View */}
          {viewMode === 'calendar' && (
            <div className="card mb-4 shadow-sm border-0" style={{ borderRadius: '12px' }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">Calendar View</h5>
                  <div className="d-flex">
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => changeMonth('prev')}
                    >
                      <FaChevronLeft />
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => changeMonth('next')}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
                
                <div className="calendar-container">
                  <div className="calendar-weekdays d-flex">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="calendar-weekday">{day}</div>
                    ))}
                  </div>
                  
                  <div className="calendar-days d-flex flex-wrap">
                    {generateCalendarDays()}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Holiday Cards */}
          {viewMode === 'cards' && (
            <div className="card shadow-sm border-0" style={{ borderRadius: '12px' }}>
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="card-title mb-0">Holidays in {getMonthName(currentMonth)} {currentYear}</h5>
                  <span className="badge bg-primary rounded-pill">{filteredHolidays.length} holidays</span>
                </div>
                
                {filteredHolidays.length === 0 ? (
                  <div className="text-center py-5">
                    <FaCalendarAlt className="text-muted mb-3" style={{ fontSize: '3rem' }} />
                    <h5 className="card-title text-muted">No Holidays Found</h5>
                    <p className="text-muted">
                      {searchTerm || filterType !== "All" 
                        ? "Try adjusting your search or filter criteria" 
                        : "No holidays scheduled for this month"}
                    </p>
                  </div>
                ) : (
                  <div className="row g-3">
                    {filteredHolidays
                      .sort((a, b) => new Date(a.date) - new Date(b.date))
                      .map((holiday) => (
                      <div key={holiday.id} className="col-md-6">
                        <div className="card h-100 border-0 shadow-sm" style={{ 
                          borderRadius: '12px',
                          borderLeft: `4px solid var(--bs-${getTypeColor(holiday.type)})`
                        }}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="card-title mb-0">{holiday.name}</h6>
                              <span className={`badge bg-${getTypeColor(holiday.type)}`}>
                                {getTypeIcon(holiday.type)}
                                {holiday.type}
                              </span>
                            </div>
                            
                            <div className="d-flex align-items-center mb-3">
                              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" 
                                   style={{ width: '48px', height: '48px' }}>
                                <span className="fw-bold text-primary">{new Date(holiday.date).getDate()}</span>
                              </div>
                              <div>
                                <div className="fw-semibold">{formatDate(holiday.date)}</div>
                                <div className="text-muted small">{holiday.day}</div>
                              </div>
                            </div>
                            
                            <p className="card-text text-muted">{holiday.description}</p>
                            
                            <div className="d-flex justify-content-end mt-3">
                              <button 
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => handleEdit(holiday)}
                              >
                                <FaEdit /> Edit
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(holiday.id)}
                              >
                                <FaTrash /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Styles */}
      <style>
        {`
          .calendar-container {
            font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          }
          
          .calendar-weekdays {
            font-weight: 600;
            color: #6c757d;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          
          .calendar-weekday {
            width: calc(100% / 7);
            text-align: center;
            padding: 8px 0;
          }
          
          .calendar-days {
            border-top: 1px solid #dee2e6;
          }
          
          .calendar-day {
            width: calc(100% / 7);
            min-height: 80px;
            border-right: 1px solid #dee2e6;
            border-bottom: 1px solid #dee2e6;
            padding: 8px;
            position: relative;
          }
          
          .calendar-day:nth-child(7n) {
            border-right: none;
          }
          
          .calendar-day.empty {
            background-color: #f8f9fa;
          }
          
          .day-number {
            font-weight: 600;
            margin-bottom: 4px;
          }
          
          .holiday-indicator {
            font-size: 12px;
            color: var(--bs-primary);
          }
          
          .has-holiday {
            font-weight: 500;
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