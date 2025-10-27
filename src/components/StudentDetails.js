import React, { useState, useEffect } from 'react';

// Custom hook to track window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

// Card Detail Popup Component
const CardDetailPopup = ({ isOpen, onClose, cardType, currentData, pastData }) => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  
  if (!isOpen) return null;
  
  const getCardTitle = () => {
    switch(cardType) {
      case 'personal': return 'Personal Information';
      case 'contact': return 'Contact Information';
      case 'academic': return 'Academic Information';
      case 'performance': return 'Academic Performance';
      case 'attendance': return 'Attendance Statistics';
      case 'history': return 'Performance History';
      case 'courses': return 'Course Information';
      case 'financial': return 'Financial Status';
      case 'activities': return 'Activities & Interests';
      case 'documents': return 'Student Documents';
      case 'timeline': return 'Academic Timeline';
      case 'notes': return 'Recent Notes';
      default: return 'Card Details';
    }
  };

  // Render detailed course information
  const renderCourseDetails = () => {
    if (!currentData || !pastData) return null;
    
    const semesterData = {
      current: {
        title: "Current Semester (Fall 2023)",
        courses: currentData,
        sgpa: "3.85",
        credits: 16
      },
      previous: {
        title: "Previous Semester (Spring 2023)",
        courses: pastData,
        sgpa: "3.75",
        credits: 15
      },
      '2022-fall': {
        title: "Fall 2022",
        courses: [
          { code: "CS350", name: "Data Structures", credits: 3, grade: "B+", instructor: "Dr. Johnson", schedule: "MWF 11:00-12:00" },
          { code: "CS370", name: "Database Systems", credits: 3, grade: "A-", instructor: "Prof. Brown", schedule: "TTh 13:00-14:30" },
          { code: "MATH250", name: "Calculus II", credits: 4, grade: "B", instructor: "Dr. Taylor", schedule: "MWF 10:00-11:00" },
          { code: "CS380", name: "Web Development", credits: 3, grade: "A", instructor: "Dr. Anderson", schedule: "TTh 15:00-16:30" },
          { code: "CS395", name: "Software Engineering", credits: 3, grade: "B+", instructor: "Dr. Thomas", schedule: "F 13:00-16:00" }
        ],
        sgpa: "3.65",
        credits: 16
      },
      '2022-spring': {
        title: "Spring 2022",
        courses: [
          { code: "CS250", name: "Programming Fundamentals", credits: 3, grade: "A", instructor: "Dr. Smith", schedule: "MWF 09:00-10:00" },
          { code: "CS270", name: "Computer Architecture", credits: 3, grade: "B+", instructor: "Prof. Davis", schedule: "TTh 10:00-11:30" },
          { code: "MATH150", name: "Calculus I", credits: 4, grade: "B", instructor: "Dr. Wilson", schedule: "MWF 11:00-12:00" },
          { code: "CS280", name: "Discrete Mathematics", credits: 3, grade: "B+", instructor: "Dr. Moore", schedule: "TTh 13:00-14:30" }
        ],
        sgpa: "3.55",
        credits: 13
      }
    };
    
    const selectedData = semesterData[selectedSemester] || semesterData.current;
    
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0, color: '#2c3e50', fontSize: '1.5rem'}}>Course Information</h3>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '10px', color: '#555', fontWeight: '500'}}>Select Semester:</span>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <option value="current">Current Semester</option>
              <option value="previous">Previous Semester</option>
              <option value="2022-fall">Fall 2022</option>
              <option value="2022-spring">Spring 2022</option>
            </select>
          </div>
        </div>
        
        <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '15px', borderRadius: '10px', marginBottom: '20px'}}>
          <h4 style={{margin: '0 0 15px 0', color:' #3498db', fontSize: '1.2rem'}}>{selectedData.title}</h4>
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden'}}>
              <thead>
                <tr style={{background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', color: 'white'}}>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Course Code</th>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Course Name</th>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Credits</th>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Grade</th>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Instructor</th>
                  <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {selectedData.courses.map((course, index) => (
                  <tr key={index} style={{background: index % 2 === 0 ? 'white' : '#f8f9fa'}}>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee', fontWeight: '600', color: '#2c3e50'}}>{course.code}</td>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{course.name}</td>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{course.credits}</td>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                      <span style={{
                        background: course.grade.includes('A') ? '#e8f5e9' : 
                                 course.grade.includes('B') ? '#fff8e1' : '#ffebee',
                        color: course.grade.includes('A') ? '#2e7d32' : 
                               course.grade.includes('B') ? '#f57f17' : '#c62828',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem',
                        display: 'inline-block'
                      }}>
                        {course.grade}
                      </span>
                    </td>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{course.instructor || 'TBD'}</td>
                    <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{course.schedule || 'TBD'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '15px', borderRadius: '10px'}}>
          <h4 style={{margin: '0 0 15px 0', color: '`#3498db', fontSize: '1.2rem'}}>Semester Summary</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
            <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db'}}>{selectedData.courses.length}</div>
              <div style={{color: '#555', fontSize: '0.9rem'}}>Total Courses</div>
            </div>
            <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db'}}>
                {selectedData.credits}
              </div>
              <div style={{color: '#555', fontSize: '0.9rem'}}>Total Credits</div>
            </div>
            <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db'}}>
                {selectedData.sgpa}
              </div>
              <div style={{color: '#555', fontSize: '0.9rem'}}>SGPA</div>
            </div>
            <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
              <div style={{fontSize: '1.8rem', fontWeight: 'bold', color: '#3498db'}}>
                {selectedData.courses.filter(c => c.grade.includes('A')).length}
              </div>
              <div style={{color: '#555', fontSize: '0.9rem'}}>A Grades</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render performance history with CGPA and SGPA
  const renderPerformanceHistory = () => {
    if (!currentData || !pastData) return null;
    
    const performanceHistory = [
      { 
        semester: "Fall 2023", 
        sgpa: "3.9", 
        cgpa: "3.85", 
        credits: 16, 
        standing: "Dean's List", 
        courses: 5,
        gradeDistribution: { a: 4, b: 1, c: 0 }
      },
      { 
        semester: "Spring 2023", 
        sgpa: "3.8", 
        cgpa: "3.78", 
        credits: 15, 
        standing: "Dean's List", 
        courses: 5,
        gradeDistribution: { a: 3, b: 2, c: 0 }
      },
      { 
        semester: "Fall 2022", 
        sgpa: "3.7", 
        cgpa: "3.65", 
        credits: 15, 
        standing: "Good Standing", 
        courses: 5,
        gradeDistribution: { a: 2, b: 3, c: 0 }
      },
      { 
        semester: "Spring 2022", 
        sgpa: "3.6", 
        cgpa: "3.55", 
        credits: 14, 
        standing: "Good Standing", 
        courses: 4,
        gradeDistribution: { a: 2, b: 2, c: 0 }
      }
    ];
    
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0, color: '#2c3e50', fontSize: '1.5rem'}}>Academic Performance</h3>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '10px', color: '#555', fontWeight: '500'}}>Select Semester:</span>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <option value="current">Current Performance</option>
              <option value="history">Performance History</option>
            </select>
          </div>
        </div>
        
        {selectedSemester === 'current' ? (
          <div>
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Current Academic Standing</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px'}}>
                <div style={{background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(52, 152, 219, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.cgpa}</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>CGPA</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.sgpa}</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>SGPA</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(231, 76, 60, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.credits}</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Credits</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(155, 89, 182, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.standing}</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Standing</div>
                </div>
              </div>
              
              <div style={{marginTop: '20px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold', color: '#555'}}>CGPA Progress</span>
                  <span style={{fontWeight: 'bold', color: '#3498db'}}>{currentData.cgpaPercentage}%</span>
                </div>
                <div style={{background: '#e0e0e0', height: '12px', borderRadius: '6px', overflow: 'hidden'}}>
                  <div 
                    style={{height: '100%', background: 'linear-gradient(90deg, #3498db, #27ae60)', width: `${currentData.cgpaPercentage}%`}}
                  ></div>
                </div>
              </div>
            </div>
            
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Grade Distribution</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px'}}>
                <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#27ae60'}}>{currentData.gradeDistribution.a}</div>
                  <div style={{color: '#555', fontSize: '0.9rem'}}>A Grades</div>
                </div>
                <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#f39c12'}}>{currentData.gradeDistribution.b}</div>
                  <div style={{color: '#555', fontSize: '0.9rem'}}>B Grades</div>
                </div>
                <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#e74c3c'}}>{currentData.gradeDistribution.c}</div>
                  <div style={{color: '#555', fontSize: '0.9rem'}}>C Grades</div>
                </div>
                <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', textAlign: 'center'}}>
                  <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#9b59b6'}}>{currentData.gradeDistribution.other || 0}</div>
                  <div style={{color: '#555', fontSize: '0.9rem'}}>Other</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Performance History</h4>
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                  <thead>
                    <tr style={{background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', color: 'white'}}>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Semester</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>SGPA</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>CGPA</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Credits</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Standing</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceHistory.map((perf, index) => (
                      <tr key={index} style={{background: index % 2 === 0 ? 'white' : '#f8f9fa'}}>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee', fontWeight: '600', color: '#2c3e50'}}>{perf.semester}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{
                            background: parseFloat(perf.sgpa) >= 3.7 ? '#e8f5e9' : 
                                     parseFloat(perf.sgpa) >= 3.0 ? '#fff8e1' : '#ffebee',
                            color: parseFloat(perf.sgpa) >= 3.7 ? '#2e7d32' : 
                                   parseFloat(perf.sgpa) >= 3.0 ? '#f57f17' : '#c62828',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            display: 'inline-block'
                          }}>
                            {perf.sgpa}
                          </span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{
                            background: parseFloat(perf.cgpa) >= 3.7 ? '#e8f5e9' : 
                                     parseFloat(perf.cgpa) >= 3.0 ? '#fff8e1' : '#ffebee',
                            color: parseFloat(perf.cgpa) >= 3.7 ? '#2e7d32' : 
                                   parseFloat(perf.cgpa) >= 3.0 ? '#f57f17' : '#c62828',
                            padding: '4px 10px',
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            fontSize: '0.85rem',
                            display: 'inline-block'
                          }}>
                            {perf.cgpa}
                          </span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{perf.credits}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{perf.standing}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          {index === 0 ? (
                            <span style={{color: '#27ae60', fontWeight: 'bold'}}>▲ Current</span>
                          ) : (
                            <span style={{color: parseFloat(perf.sgpa) > parseFloat(performanceHistory[index-1].sgpa) ? '#27ae60' : '#e74c3c', fontWeight: 'bold'}}>
                              {parseFloat(perf.sgpa) > parseFloat(performanceHistory[index-1].sgpa) ? '▲' : '▼'} 
                              {Math.abs(parseFloat(perf.sgpa) - parseFloat(performanceHistory[index-1].sgpa)).toFixed(2)}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Performance Trends</h4>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px'}}>
                <div style={{flex: 1, marginRight: '10px'}}>
                  <div style={{fontWeight: 'bold', color: '#555', marginBottom: '5px'}}>SGPA Trend</div>
                  <div style={{height: '150px', position: 'relative'}}>
                    <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(52, 152, 219, 0.1), transparent)'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '0', width: '25%', height: '85%', background: 'linear-gradient(to top, #3498db, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '25%', width: '25%', height: '80%', background: 'linear-gradient(to top, #3498db, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '50%', width: '25%', height: '75%', background: 'linear-gradient(to top, #3498db, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '75%', width: '25%', height: '70%', background: 'linear-gradient(to top, #3498db, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                  </div>
                </div>
                <div style={{flex: 1, marginLeft: '10px'}}>
                  <div style={{fontWeight: 'bold', color: '#555', marginBottom: '5px'}}>CGPA Trend</div>
                  <div style={{height: '150px', position: 'relative'}}>
                    <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(39, 174, 96, 0.1), transparent)'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '0', width: '25%', height: '80%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '25%', width: '25%', height: '78%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '50%', width: '25%', height: '75%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                    <div style={{position: 'absolute', bottom: '0', left: '75%', width: '25%', height: '73%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render attendance statistics
  const renderAttendanceStats = () => {
    if (!currentData || !pastData) return null;
    
    const attendanceHistory = [
      { semester: "Fall 2023", present: 92, absent: 5, late: 3, excused: 2 },
      { semester: "Spring 2023", present: 88, absent: 7, late: 5, excused: 3 },
      { semester: "Fall 2022", present: 85, absent: 8, late: 7, excused: 4 },
      { semester: "Spring 2022", present: 82, absent: 10, late: 8, excused: 5 }
    ];
    
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0, color: '#2c3e50', fontSize: '1.5rem'}}>Attendance Statistics</h3>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '10px', color: '#555', fontWeight: '500'}}>Select Semester:</span>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <option value="current">Current Semester</option>
              <option value="history">Attendance History</option>
            </select>
          </div>
        </div>
        
        {selectedSemester === 'current' ? (
          <div>
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Current Semester Attendance</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px'}}>
                <div style={{background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(39, 174, 96, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.present}%</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Present</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(231, 76, 60, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.absent}%</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Absent</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #f39c12 0%, #d68910 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(243, 156, 18, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.late}%</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Late</div>
                </div>
                <div style={{background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)', padding: '20px', borderRadius: '10px', color: 'white', textAlign: 'center', boxShadow: '0 4px 10px rgba(155, 89, 182, 0.3)'}}>
                  <div style={{fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '5px'}}>{currentData.excused || 0}%</div>
                  <div style={{fontSize: '1rem', opacity: '0.9'}}>Excused</div>
                </div>
              </div>
              
              <div style={{height: '25px', background: '#e0e0e0', borderRadius: '12.5px', overflow: 'hidden', display: 'flex'}}>
                <div style={{height: '100%', width: `${currentData.present}%`, background: 'linear-gradient(90deg, #27ae60, #2ecc71)'}}></div>
                <div style={{height: '100%', width: `${currentData.absent}%`, background: 'linear-gradient(90deg, #e74c3c, #ec7063)'}}></div>
                <div style={{height: '100%', width: `${currentData.late}%`, background: 'linear-gradient(90deg, #f39c12, #f5b041)'}}></div>
                <div style={{height: '100%', width: `${currentData.excused || 0}%`, background: 'linear-gradient(90deg, #9b59b6, #bb8fce)'}}></div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px', marginBottom: '20px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '`#3498db', fontSize: '1.3rem'}}>Attendance History</h4>
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.05)', borderRadius: '8px', overflow: 'hidden'}}>
                  <thead>
                    <tr style={{background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)', color: 'white'}}>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Semester</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Present</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Absent</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Late</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Excused</th>
                      <th style={{padding: '12px 15px', textAlign: 'left', fontWeight: '600'}}>Attendance Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((att, index) => (
                      <tr key={index} style={{background: index % 2 === 0 ? 'white' : '#f8f9fa'}}>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee', fontWeight: '600', color: '#2c3e50'}}>{att.semester}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{color: '#27ae60', fontWeight: 'bold'}}>{att.present}%</span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{color: '#e74c3c', fontWeight: 'bold'}}>{att.absent}%</span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{color: '#f39c12', fontWeight: 'bold'}}>{att.late}%</span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <span style={{color: '#9b59b6', fontWeight: 'bold'}}>{att.excused}%</span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>
                          <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '100px', marginRight: '10px'}}>
                              <div style={{background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                                <div style={{height: '100%', background: 'linear-gradient(90deg, #27ae60, #2ecc71)', width: `${att.present}%`}}></div>
                              </div>
                            </div>
                            <span style={{fontWeight: 'bold'}}>{att.present}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px'}}>
              <h4 style={{margin: '0 0 20px 0', color: '`#3498db', fontSize: '1.3rem'}}>Attendance Trends</h4>
              <div style={{height: '200px', position: 'relative'}}>
                <div style={{position: 'absolute', bottom: '0', left: '0', width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(39, 174, 96, 0.1), transparent)'}}></div>
                <div style={{position: 'absolute', bottom: '0', left: '0', width: '25%', height: '92%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                <div style={{position: 'absolute', bottom: '0', left: '25%', width: '25%', height: '88%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                <div style={{position: 'absolute', bottom: '0', left: '50%', width: '25%', height: '85%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                <div style={{position: 'absolute', bottom: '0', left: '75%', width: '25%', height: '82%', background: 'linear-gradient(to top, #27ae60, transparent)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}}></div>
                
                <div style={{position: 'absolute', bottom: '-25px', left: '0', width: '25%', textAlign: 'center', fontSize: '0.8rem', color: '#555'}}>Fall 2023</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '25%', width: '25%', textAlign: 'center', fontSize: '0.8rem', color: '#555'}}>Spring 2023</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '50%', width: '25%', textAlign: 'center', fontSize: '0.8rem', color: '#555'}}>Fall 2022</div>
                <div style={{position: 'absolute', bottom: '-25px', left: '75%', width: '25%', textAlign: 'center', fontSize: '0.8rem', color: '#555'}}>Spring 2022</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render data comparison table (for other card types)
  const renderDataComparison = () => {
    if (!currentData || !pastData) return null;

    // Handle different data types
    if (cardType === 'courses') {
      return renderCourseDetails();
    } else if (cardType === 'contact') {
      return renderContactDetails();
    } else if (cardType === 'performance') {
      return renderPerformanceHistory();
    } else if (cardType === 'attendance') {
      return renderAttendanceStats();
    }

    // For other data types, create a comparison table
    const fields = Object.keys(currentData);
    
    return (
      <div style={{overflowX: 'auto'}}>
        <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '15px'}}>
          <thead>
            <tr style={{background: '#f8f9fa'}}>
              <th style={{padding: '10px', border: '1px solid #ddd'}}>Field</th>
              <th style={{padding: '10px', border: '1px solid #ddd'}}>Current</th>
              <th style={{padding: '10px', border: '1px solid #ddd'}}>Previous</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td style={{padding: '10px', border: '1px solid #ddd', fontWeight: 'bold', textTransform: 'capitalize'}}>
                  {field.replace(/([A-Z])/g, ' $1').trim()}
                </td>
                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                  {typeof currentData[field] === 'object' 
                    ? JSON.stringify(currentData[field]) 
                    : currentData[field]}
                </td>
                <td style={{padding: '10px', border: '1px solid #ddd'}}>
                  {pastData[field] 
                    ? (typeof pastData[field] === 'object' 
                        ? JSON.stringify(pastData[field]) 
                        : pastData[field])
                    : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render detailed contact information
  const renderContactDetails = () => {
    if (!currentData || !pastData) return null;
    
    const currentContact = {
      ...currentData,
      fatherName: "Michael Johnson",
      fatherPhone: "(555) 111-2222",
      fatherOccupation: "Engineer",
      motherName: "Sarah Johnson",
      motherPhone: "(555) 222-3333",
      motherOccupation: "Teacher",
      permanentAddress: "456 Home Street, Hometown, ST 12345",
      mailingAddress: "123 University Ave, Campus Town, ST 54321",
      personalEmail: "alex.johnson.personal@email.com",
      universityEmail: "alex.johnson@university.edu",
      primaryPhone: "(555) 123-4567",
      secondaryPhone: "(555) 987-6543",
      emergencyContacts: [
        { name: "Sarah Johnson", relationship: "Mother", phone: "(555) 222-3333" },
        { name: "Michael Johnson", relationship: "Father", phone: "(555) 111-2222" },
        { name: "Dr. Emily Roberts", relationship: "Academic Advisor", phone: "(555) 444-5555" }
      ]
    };
    
    const pastContact = {
      ...pastData,
      fatherName: "Michael Johnson",
      fatherPhone: "(555) 111-2222",
      fatherOccupation: "Engineer",
      motherName: "Sarah Johnson",
      motherPhone: "(555) 222-3333",
      motherOccupation: "Teacher",
      permanentAddress: "456 Home Street, Hometown, ST 12345",
      mailingAddress: "123 University Ave, Campus Town, ST 54321",
      personalEmail: "alex.j@personal.email.com",
      universityEmail: "alex.j@university.edu",
      primaryPhone: "(555) 123-4567",
      secondaryPhone: "(555) 987-6543",
      emergencyContacts: [
        { name: "Sarah Johnson", relationship: "Mother", phone: "(555) 222-3333" },
        { name: "Michael Johnson", relationship: "Father", phone: "(555) 111-2222" }
      ]
    };
    
    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <h3 style={{margin: 0, color: '#2c3e50', fontSize: '1.5rem'}}>Contact Information</h3>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <span style={{marginRight: '10px', color: '#555', fontWeight: '500'}}>Select Version:</span>
            <select 
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid #ddd',
                background: 'white',
                color: '#333',
                fontSize: '0.9rem',
                fontWeight: '500',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <option value="current">Current</option>
              <option value="previous">Previous</option>
            </select>
          </div>
        </div>
        
        {selectedSemester === 'current' ? (
          <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px'}}>
            <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Current Contact Details</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px'}}>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Name</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.fatherName}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.fatherPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Occupation</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.fatherOccupation}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Name</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.motherName}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.motherPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Occupation</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.motherOccupation}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Personal Email</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.personalEmail}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>University Email</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.universityEmail}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Primary Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.primaryPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Secondary Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.secondaryPhone}</p>
              </div>
              <div style={{gridColumn: '1 / -1', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Permanent Address</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.permanentAddress}</p>
              </div>
              <div style={{gridColumn: '1 / -1', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mailing Address</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{currentContact.mailingAddress}</p>
              </div>
            </div>
            
            <div style={{marginTop: '20px'}}>
              <h4 style={{marginBottom: '10px', color: '#2c3e50'}}>Emergency Contacts</h4>
              <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#f8f9fa'}}>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Name</th>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Relationship</th>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentContact.emergencyContacts.map((contact, index) => (
                      <tr key={index}>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.name}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.relationship}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)', padding: '20px', borderRadius: '10px'}}>
            <h4 style={{margin: '0 0 20px 0', color: '#3498db', fontSize: '1.3rem'}}>Previous Contact Details</h4>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px'}}>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Name</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.fatherName}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.fatherPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Father's Occupation</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.fatherOccupation}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Name</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.motherName}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.motherPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mother's Occupation</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.motherOccupation}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Personal Email</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.personalEmail}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>University Email</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.universityEmail}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Primary Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.primaryPhone}</p>
              </div>
              <div style={{background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Secondary Phone</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.secondaryPhone}</p>
              </div>
              <div style={{gridColumn: '1 / -1', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Permanent Address</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.permanentAddress}</p>
              </div>
              <div style={{gridColumn: '1 / -1', background: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                <label style={{display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#555'}}>Mailing Address</label>
                <p style={{margin: 0, padding: '8px', background: '#f8f9fa', borderRadius: '4px'}}>{pastContact.mailingAddress}</p>
              </div>
            </div>
            
            <div style={{marginTop: '20px'}}>
              <h4 style={{marginBottom: '10px', color: '#2c3e50'}}>Emergency Contacts</h4>
              <div style={{background: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{background: '#f8f9fa'}}>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Name</th>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Relationship</th>
                      <th style={{padding: '12px 15px', border: '1px solid #eee', textAlign: 'left', fontWeight: '600'}}>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pastContact.emergencyContacts.map((contact, index) => (
                      <tr key={index}>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.name}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.relationship}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #eee'}}>{contact.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflow: 'auto',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
          <h2 style={{margin: 0, color: '#2c3e50', fontSize: '1.8rem', fontWeight: '600'}}>{getCardTitle()}</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: '#7f8c8d',
              transition: 'all 0.3s ease',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.target.style.color = '#e74c3c'}
            onMouseLeave={(e) => e.target.style.color = '#7f8c8d'}
          >
            &times;
          </button>
        </div>
        
        <div style={{marginBottom: '25px', padding: '15px', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: '10px', borderLeft: '4px solid #2196f3'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#1976d2', fontSize: '1.2rem', fontWeight: '600'}}>Detailed Information</h3>
          <p style={{margin: 0, color: '#0d47a1', fontSize: '1rem'}}>
            {cardType === 'courses' ? 'Current and previous semester course information with grades, instructors, and schedules.' :
             cardType === 'contact' ? 'Detailed contact information including family contacts, addresses, and emergency contacts.' :
             cardType === 'performance' ? 'Current academic performance and historical GPA trends across semesters.' :
             cardType === 'attendance' ? 'Current semester attendance statistics and historical attendance records.' :
             'Detailed comparison of current and previous data.'}
          </p>
        </div>
        
        {renderDataComparison()}
        
        <div style={{marginTop: '30px', textAlign: 'right'}}>
          <button 
            onClick={onClose}
            style={{
              padding: '12px 25px',
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Notes Popup Component
const NotesPopup = ({ isOpen, onClose, notes }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflow: 'auto',
        padding: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
          <h2 style={{margin: 0, color: '#2c3e50', fontSize: '1.8rem', fontWeight: '600'}}>Recent Notes</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '2rem',
              cursor: 'pointer',
              color: '#7f8c8d',
              transition: 'all 0.3s ease',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => e.target.style.color = '#e74c3c'}
            onMouseLeave={(e) => e.target.style.color = '#7f8c8d'}
          >
            &times;
          </button>
        </div>
        
        <div style={{marginBottom: '25px', padding: '15px', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: '10px', borderLeft: '4px solid #2196f3'}}>
          <h3 style={{margin: '0 0 10px 0', color: '#1976d2', fontSize: '1.2rem', fontWeight: '600'}}>Notes Information</h3>
          <p style={{margin: 0, color: '#0d47a1', fontSize: '1rem'}}>
            Recent notes and comments about the student's academic progress and activities.
          </p>
        </div>
        
        {notes.map((note, index) => (
          <div key={index} style={{
            background: '#fff9c4',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '15px',
            borderLeft: '3px solid #fbc02d'
          }}>
            <div style={{fontSize: '0.8rem', color: '#777', marginBottom: '5px'}}>{note.date}</div>
            <div style={{color: '#333'}}>{note.content}</div>
            <div style={{fontWeight: 'bold', color: '#2c3e50', marginTop: '5px'}}>- {note.author}</div>
          </div>
        ))}
        
        <div style={{marginTop: '30px', textAlign: 'right'}}>
          <button 
            onClick={onClose}
            style={{
              padding: '12px 25px',
              background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '1rem',
              boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ type: null, data: null });
  const [pastData, setPastData] = useState({});
  const [notesPopupOpen, setNotesPopupOpen] = useState(false);
  const windowSize = useWindowSize();
  
  // Determine if we're in mobile view
  const isMobile = windowSize.width && windowSize.width <= 768;

  // Handle logout
  const handleLogout = () => {
    // In a real app, this would clear authentication tokens/cookies
    alert('You have been logged out');
    // Redirect to login page
    window.location.href = '/login';
  };

  // Handle card click
  const handleCardClick = (cardType, data) => {
    setSelectedCard({ type: cardType, data });
    setPopupOpen(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedCard({ type: null, data: null });
  };

  // Handle notes popup
  const handleOpenNotesPopup = () => {
    setNotesPopupOpen(true);
  };

  const handleCloseNotesPopup = () => {
    setNotesPopupOpen(false);
  };

  // Simulate API call to fetch student data
  useEffect(() => {
    const fetchStudentData = () => {
      setTimeout(() => {
        const studentData = {
          personal: {
            fullName: "Alex Michael Johnson",
            studentId: "CS2021-0472",
            dateOfBirth: "March 15, 2001",
            gender: "Male",
            nationality: "United States",
            photoUrl: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          contact: {
            email: "alex.johnson@university.edu",
            phone: "(555) 123-4567",
            address: "123 University Ave, Campus Town, ST 54321",
            emergencyContact: "Sarah Johnson (Mother) - (555) 987-6543"
          },
          academic: {
            major: "Computer Science",
            minor: "Mathematics",
            academicYear: "Senior (4th Year)",
            enrollmentDate: "September 1, 2021",
            expectedGraduation: "May 2025",
            advisor: "Dr. Emily Roberts"
          },
          performance: {
            cgpa: "3.85",
            sgpa: "3.9",
            cgpaPercentage: 96,
            credits: "98 / 120",
            creditsPercentage: 82,
            standing: "Dean's List (Last 3 Semesters)",
            honors: "Cum Laude (Projected)",
            gradeDistribution: { a: 4, b: 1, c: 0, other: 0 }
          },
          courses: [
            { code: "CS450", name: "Algorithms", credits: 3, grade: "A", instructor: "Dr. Smith", schedule: "MWF 10:00-11:00" },
            { code: "CS470", name: "Machine Learning", credits: 3, grade: "A-", instructor: "Prof. Chen", schedule: "TTh 14:00-15:30" },
            { code: "MATH350", name: "Linear Algebra", credits: 3, grade: "B+", instructor: "Dr. Williams", schedule: "MWF 13:00-14:00" },
            { code: "CS480", name: "Software Engineering", credits: 4, grade: "A", instructor: "Dr. Davis", schedule: "TTh 10:00-11:30" },
            { code: "CS495", name: "Senior Project", credits: 3, grade: "A", instructor: "Dr. Miller", schedule: "F 09:00-12:00" }
          ],
          activities: {
            clubs: [
              "ACM Student Chapter",
              "Robotics Club",
              "Coding Bootcamp Mentor"
            ],
            sports: [
              "University Tennis Team",
              "Intramural Soccer"
            ],
            hobbies: [
              "Photography",
              "Hiking",
              "Open Source Development"
            ]
          },
          status: "Active Student",
          attendance: {
            present: 92,
            absent: 5,
            late: 3,
            excused: 2
          },
          financial: {
            tuitionPaid: true,
            balance: "$0.00",
            scholarships: ["Merit Scholarship", "Tech Excellence Grant"],
            paymentHistory: [
              { date: "Sep 1, 2023", description: "Fall Tuition", amount: "$12,500.00" },
              { date: "Jan 15, 2023", description: "Spring Tuition", amount: "$12,500.00" },
              { date: "Sep 1, 2022", description: "Fall Tuition", amount: "$12,000.00" }
            ]
          },
          documents: [
            { name: "Official Transcript", date: "Aug 15, 2023", type: "pdf" },
            { name: "Enrollment Verification", date: "Sep 5, 2023", type: "pdf" },
            { name: "Degree Audit", date: "Oct 10, 2023", type: "pdf" }
          ],
          timeline: [
            { date: "Sep 1, 2021", event: "Enrolled at University" },
            { date: "May 15, 2022", event: "Completed Freshman Year" },
            { date: "Aug 20, 2022", event: "Declared Computer Science Major" },
            { date: "Dec 15, 2022", event: "Joined Robotics Club" },
            { date: "May 10, 2023", event: "Summer Internship at Tech Corp" },
            { date: "Aug 25, 2023", event: "Started Senior Year" }
          ],
          notes: [
            { 
              date: "Oct 5, 2023", 
              content: "Student expressed interest in pursuing graduate studies in AI.", 
              author: "Dr. Emily Roberts" 
            },
            { 
              date: "Sep 12, 2023", 
              content: "Excellent performance in Machine Learning course. Recommended for research assistant position.", 
              author: "Prof. Michael Chen" 
            }
          ]
        };
        
        // Create mock past data
        const mockPastData = {
          personal: {
            fullName: "Alex M. Johnson",
            studentId: "CS2021-0472",
            dateOfBirth: "March 15, 2001",
            gender: "Male",
            nationality: "United States"
          },
          contact: {
            email: "alex.j@university.edu",
            phone: "(555) 123-4567",
            address: "123 University Ave, Campus Town, ST 54321",
            emergencyContact: "Sarah Johnson (Mother) - (555) 987-6543"
          },
          academic: {
            major: "Computer Science",
            minor: "Mathematics",
            academicYear: "Junior (3rd Year)",
            enrollmentDate: "September 1, 2021",
            expectedGraduation: "May 2025",
            advisor: "Dr. Emily Roberts"
          },
          performance: {
            cgpa: "3.75",
            sgpa: "3.8",
            cgpaPercentage: 94,
            credits: "75 / 120",
            creditsPercentage: 63,
            standing: "Dean's List (Last 2 Semesters)",
            honors: "None",
            gradeDistribution: { a: 3, b: 2, c: 0, other: 0 }
          },
          courses: [
            { code: "CS350", name: "Data Structures", credits: 3, grade: "B+", instructor: "Dr. Johnson", schedule: "MWF 11:00-12:00" },
            { code: "CS370", name: "Database Systems", credits: 3, grade: "A-", instructor: "Prof. Brown", schedule: "TTh 13:00-14:30" },
            { code: "MATH250", name: "Calculus II", credits: 4, grade: "B", instructor: "Dr. Taylor", schedule: "MWF 10:00-11:00" },
            { code: "CS380", name: "Web Development", credits: 3, grade: "A", instructor: "Dr. Anderson", schedule: "TTh 15:00-16:30" },
            { code: "CS395", name: "Software Engineering", credits: 3, grade: "B+", instructor: "Dr. Thomas", schedule: "F 13:00-16:00" }
          ],
          activities: {
            clubs: [
              "ACM Student Chapter",
              "Coding Club"
            ],
            sports: [
              "University Tennis Team"
            ],
            hobbies: [
              "Photography",
              "Hiking"
            ]
          },
          attendance: {
            present: 88,
            absent: 7,
            late: 5,
            excused: 3
          },
          financial: {
            tuitionPaid: true,
            balance: "$0.00",
            scholarships: ["Merit Scholarship"],
            paymentHistory: [
              { date: "Sep 1, 2022", description: "Fall Tuition", amount: "$12,000.00" },
              { date: "Jan 15, 2022", description: "Spring Tuition", amount: "$12,000.00" }
            ]
          },
          documents: [
            { name: "Official Transcript", date: "Aug 15, 2022", type: "pdf" },
            { name: "Enrollment Verification", date: "Sep 5, 2022", type: "pdf" }
          ],
          timeline: [
            { date: "Sep 1, 2021", event: "Enrolled at University" },
            { date: "May 15, 2022", event: "Completed Freshman Year" },
            { date: "Aug 20, 2022", event: "Declared Computer Science Major" }
          ],
          notes: [
            { 
              date: "Oct 5, 2022", 
              content: "Student is doing well in courses.", 
              author: "Dr. Emily Roberts" 
            }
          ]
        };
        
        setStudent(studentData);
        setEditedStudent(JSON.parse(JSON.stringify(studentData)));
        setPastData(mockPastData);
        setLoading(false);
      }, 800);
    };

    fetchStudentData();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      // Save changes
      setStudent(editedStudent);
      setEditMode(false);
    } else {
      // Enter edit mode
      setEditMode(true);
    }
  };

  const handleInputChange = (section, field, value) => {
    setEditedStudent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleCancelEdit = () => {
    setEditedStudent(JSON.parse(JSON.stringify(student)));
    setEditMode(false);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        handleInputChange('personal', 'photoUrl', event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Styles object
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
      color: 'white',
      borderRadius: '15px',
      marginBottom: '20px'
    },
    headerTitle: {
      fontSize: '1.8rem',
      fontWeight: '600',
      margin: 0
    },
    logoutButton: {
      padding: '10px 20px',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '8px',
      color: 'white',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    logoutIcon: {
      marginRight: '8px'
    },
    profileSection: {
      display: 'flex',
      alignItems: 'center',
      background: 'white',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    profileImageContainer: {
      position: 'relative',
      marginRight: '20px'
    },
    profileImage: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #3498db'
    },
    uploadButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      background: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
    },
    profileInfo: {
      flex: 1
    },
    profileName: {
      fontSize: '1.5rem',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0 0 5px 0'
    },
    profileDetails: {
      color: '#555',
      margin: '0 0 10px 0'
    },
    statusBadge: {
      background: '#27ae60',
      color: 'white',
      padding: '5px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    tabsContainer: {
      background: 'white',
      padding: '0',
      borderBottom: '1px solid #e0e0e0',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    tabs: {
      display: 'flex',
      overflowX: 'auto',
      justifyContent: isMobile ? 'center' : 'flex-start',
      width: '100%'
    },
    tab: {
      padding: '15px 25px',
      background: 'none',
      border: 'none',
      fontSize: '1rem',
      fontWeight: '600',
      color: '#555',
      cursor: 'pointer',
      borderBottom: '3px solid transparent',
      transition: 'all 0.3s ease',
      position: 'relative'
    },
    activeTab: {
      color: '#3498db',
      borderBottom: '3px solid #3498db'
    },
    contentContainer: {
      padding: isMobile ? '20px' : '30px',
      background: 'white',
      borderRadius: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      color: '#2c3e50',
      marginBottom: '20px',
      paddingBottom: '10px',
      borderBottom: '2px solid #3498db',
      display: 'flex',
      alignItems: 'center'
    },
    sectionIcon: {
      marginRight: '10px',
      color: '#3498db'
    },
    cardGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '25px'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      border: '1px solid #e0e0e0',
      cursor: 'pointer',
      height: '100%'
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
    },
    cardTitle: {
      color: '#2c3e50',
      marginBottom: '20px',
      fontSize: '1.2rem',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '10px',
      borderBottom: '1px solid #e0e0e0'
    },
    cardIcon: {
      marginRight: '10px',
      color: '#3498db'
    },
    detailGroup: {
      marginBottom: '15px'
    },
    detailLabel: {
      display: 'block',
      fontWeight: '600',
      color: '#555',
      marginBottom: '5px',
      fontSize: '0.9rem'
    },
    detailValue: {
      fontSize: '1rem',
      color: '#333',
      background: '#f8f9fa',
      padding: '12px',
      borderRadius: '6px',
      borderLeft: '3px solid #3498db'
    },
    fullWidth: {
      gridColumn: '1 / -1'
    },
    performanceBar: {
      background: '#e0e0e0',
      height: '10px',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: '5px'
    },
    performanceFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #3498db, #27ae60)',
      borderRadius: '5px'
    },
    tag: {
      display: 'inline-block',
      background: '#e3f2fd',
      color: '#1976d2',
      padding: '5px 10px',
      borderRadius: '15px',
      marginRight: '8px',
      marginBottom: '8px',
      fontSize: '0.85rem'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    },
    contactIcon: {
      width: '20px',
      color: '#3498db',
      marginRight: '10px'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      padding: '20px 0',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start'
    },
    button: {
      padding: '12px 25px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
      justifyContent: 'center'
    },
    primaryButton: {
      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
      color: 'white',
      boxShadow: '0 4px 8px rgba(52, 152, 219, 0.3)'
    },
    secondaryButton: {
      background: 'linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)',
      color: '#2c3e50',
      boxShadow: '0 4px 8px rgba(189, 195, 199, 0.3)'
    },
    buttonIcon: {
      marginRight: '8px'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    },
    spinner: {
      width: '50px',
      height: '50px',
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #2e8bc9ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    },
    attendanceStats: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    statItem: {
      textAlign: 'center',
      padding: '15px',
      background: '#f8f9fa',
      borderRadius: '8px',
      flex: 1,
      margin: '0 5px'
    },
    statValue: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '`#3498db'
    },
    statLabel: {
      color: '#555',
      fontSize: '0.9rem'
    },
    attendanceChart: {
      height: '20px',
      background: '#e0e0e0',
      borderRadius: '10px',
      overflow: 'hidden',
      display: 'flex',
      marginTop: '10px'
    },
    chartSegment: {
      height: '100%'
    },
    presentSegment: {
      background: '#27ae60'
    },
    absentSegment: {
      background: '#e74c3c'
    },
    lateSegment: {
      background: '#f39c12'
    },
    historyItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #eee'
    },
    historyTerm: {
      fontWeight: '600',
      color: '#2c3e50'
    },
    historyGpa: {
      fontWeight: 'bold',
      color: '#3498db',
      background: '#e3f2fd',
      padding: '4px 8px',
      borderRadius: '4px'
    },
    statusPaid: {
      color: '#27ae60',
      fontWeight: 'bold',
      background: '#e8f8f5',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block'
    },
    statusUnpaid: {
      color: '#e74c3c',
      fontWeight: 'bold',
      background: '#fdedec',
      padding: '4px 8px',
      borderRadius: '4px',
      display: 'inline-block'
    },
    paymentItem: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '12px 0',
      borderBottom: '1px solid #eee'
    },
    paymentDate: {
      color: '#777',
      fontSize: '0.9rem',
      width: '80px'
    },
    paymentDesc: {
      flexGrow: 1,
      marginLeft: '15px',
      color: '#2c3e50'
    },
    paymentAmount: {
      fontWeight: 'bold',
      color: '#27ae60'
    },
    input: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
      borderLeft: '3px solid #3498db',
      background: '#f8f9fa'
    },
    select: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
      borderLeft: '3px solid #3498db',
      background: '#f8f9fa'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '1rem',
      borderLeft: '3px solid #3498db',
      resize: 'vertical',
      minHeight: '80px',
      background: '#f8f9fa'
    },
    documentItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #eee',
    },
    documentIcon: {
      color: '#3498db',
      marginRight: '10px',
      fontSize: '1.2rem'
    },
    documentName: {
      flexGrow: 1,
      color: '#2c3e50'
    },
    documentDate: {
      color: '#777',
      fontSize: '0.9rem'
    },
    timeline: {
      position: 'relative',
      paddingLeft: '30px'
    },
    timelineLine: {
      position: 'absolute',
      left: '10px',
      top: '0',
      height: '100%',
      width: '2px',
      background: '#e0e0e0'
    },
    timelineItem: {
      position: 'relative',
      marginBottom: '20px'
    },
    timelineDot: {
      position: 'absolute',
      left: '-30px',
      top: '5px',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      background: '#3498db'
    },
    timelineDate: {
      fontSize: '0.9rem',
      color: '#777',
      marginBottom: '5px'
    },
    timelineContent: {
      background: '#f8f9fa',
      padding: '10px',
      borderRadius: '6px',
      borderLeft: '3px solid #3498db'
    },
    noteItem: {
      background: '#fff9c4',
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '15px',
      borderLeft: '3px solid #fbc02d'
    },
    noteDate: {
      fontSize: '0.8rem',
      color: '#777',
      marginBottom: '5px'
    },
    noteContent: {
      color: '#333'
    },
    noteAuthor: {
      fontWeight: 'bold',
      color: '#2c3e50',
      marginTop: '5px'
    },
    formRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '15px'
    },
    formColumn: {
      flex: 1
    },
    formGroup: {
      marginBottom: '15px'
    },
    formLabel: {
      display: 'block',
      fontWeight: '600',
      color: '#555',
      marginBottom: '5px',
      fontSize: '0.9rem'
    },
    formControl: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '0.95rem',
      background: '#f8f9fa'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: '20px'
    },
    tableHeader: {
      background: '#f1f1f1',
      fontWeight: '600'
    },
    tableCell: {
      padding: '10px',
      border: '1px solid #ddd',
      textAlign: 'left'
    },
    notesButton: {
      background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 15px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      marginLeft: '10px'
    },
    notesButtonIcon: {
      marginRight: '5px'
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading student details...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      {/* Header with logout button */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>Student Academic Details</h1>
        <button style={styles.logoutButton} onClick={handleLogout}>
          <i className="fas fa-sign-out-alt" style={styles.logoutIcon}></i>
          Logout
        </button>
      </div>

      {/* Profile section */}
      <div style={styles.profileSection}>
        <div style={styles.profileImageContainer}>
          <img 
            src={profileImage || student.personal.photoUrl} 
            alt="Student Photo" 
            style={styles.profileImage} 
          />
          {editMode && (
            <label style={styles.uploadButton}>
              <i className="fas fa-camera"></i>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                onChange={handleImageUpload}
              />
            </label>
          )}
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.profileName}>{student.personal.fullName}</h2>
          <p style={styles.profileDetails}>Student ID: {student.personal.studentId}</p>
          <p style={styles.profileDetails}>{student.academic.major} | Class of 2024</p>
          <div style={styles.statusBadge}>{student.status}</div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div style={styles.tabsContainer}>
        <div style={styles.tabs}>
          <button 
            style={{...styles.tab, ...(activeTab === 'overview' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'personal' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('personal')}
          >
            Personal
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'contact' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'academic' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('academic')}
          >
            Academic
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'performance' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'attendance' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('attendance')}
          >
            Attendance
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'courses' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'financial' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('financial')}
          >
            Financial
          </button>
          <button 
            style={{...styles.tab, ...(activeTab === 'documents' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
        </div>
      </div>

      {/* Content based on active tab */}
      <div style={styles.contentContainer}>
        {activeTab === 'overview' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-user" style={styles.sectionIcon}></i> Personal Information
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Full Name</label>
                  <div style={styles.formControl}>{student.personal.fullName}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Student ID</label>
                  <div style={styles.formControl}>{student.personal.studentId}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Date of Birth</label>
                  <div style={styles.formControl}>{student.personal.dateOfBirth}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Gender</label>
                  <div style={styles.formControl}>{student.personal.gender}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Nationality</label>
                  <div style={styles.formControl}>{student.personal.nationality}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Status</label>
                  <div style={styles.formControl}>{student.status}</div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-graduation-cap" style={styles.sectionIcon}></i> Academic Information
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Major</label>
                  <div style={styles.formControl}>{student.academic.major}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Minor</label>
                  <div style={styles.formControl}>{student.academic.minor}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Academic Year</label>
                  <div style={styles.formControl}>{student.academic.academicYear}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Expected Graduation</label>
                  <div style={styles.formControl}>{student.academic.expectedGraduation}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Academic Advisor</label>
                  <div style={styles.formControl}>{student.academic.advisor}</div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Enrollment Date</label>
                  <div style={styles.formControl}>{student.academic.enrollmentDate}</div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-chart-line" style={styles.sectionIcon}></i> Academic Performance
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>CGPA</label>
                  <div style={styles.formControl}>{student.performance.cgpa}</div>
                  <div style={styles.performanceBar}>
                    <div 
                      style={{...styles.performanceFill, width: `${student.performance.cgpaPercentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>SGPA</label>
                  <div style={styles.formControl}>{student.performance.sgpa}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Credits Completed</label>
                  <div style={styles.formControl}>{student.performance.credits}</div>
                  <div style={styles.performanceBar}>
                    <div 
                      style={{...styles.performanceFill, width: `${student.performance.creditsPercentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Academic Standing</label>
                  <div style={styles.formControl}>{student.performance.standing}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Honors</label>
                  <div style={styles.formControl}>{student.performance.honors}</div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-sticky-note" style={styles.sectionIcon}></i> Recent Notes
              <button style={styles.notesButton} onClick={handleOpenNotesPopup}>
                <i className="fas fa-external-link-alt" style={styles.notesButtonIcon}></i>
                View All
              </button>
            </div>
            {student.notes.slice(0, 1).map((note, index) => (
              <div key={index} style={styles.noteItem}>
                <div style={styles.noteDate}>{note.date}</div>
                <div style={styles.noteContent}>{note.content}</div>
                <div style={styles.noteAuthor}>- {note.author}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'personal' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-user" style={styles.sectionIcon}></i> Personal Information
            </div>
            {editMode ? (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Full Name</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.personal.fullName}
                        onChange={(e) => handleInputChange('personal', 'fullName', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Student ID</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.personal.studentId}
                        onChange={(e) => handleInputChange('personal', 'studentId', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Date of Birth</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.personal.dateOfBirth}
                        onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Gender</label>
                      <select 
                        style={styles.select}
                        value={editedStudent.personal.gender}
                        onChange={(e) => handleInputChange('personal', 'gender', e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Nationality</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.personal.nationality}
                        onChange={(e) => handleInputChange('personal', 'nationality', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Status</label>
                      <select 
                        style={styles.select}
                        value={editedStudent.status}
                        onChange={(e) => handleInputChange('status', 'status', e.target.value)}
                      >
                        <option value="Active Student">Active Student</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Graduated">Graduated</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Full Name</label>
                      <div style={styles.formControl}>{student.personal.fullName}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Student ID</label>
                      <div style={styles.formControl}>{student.personal.studentId}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Date of Birth</label>
                      <div style={styles.formControl}>{student.personal.dateOfBirth}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Gender</label>
                      <div style={styles.formControl}>{student.personal.gender}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Nationality</label>
                      <div style={styles.formControl}>{student.personal.nationality}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Status</label>
                      <div style={styles.formControl}>{student.status}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'contact' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-address-book" style={styles.sectionIcon}></i> Contact Information
            </div>
            {editMode ? (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email</label>
                      <input 
                        type="email" 
                        style={styles.input}
                        value={editedStudent.contact.email}
                        onChange={(e) => handleInputChange('contact', 'email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Phone</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.contact.phone}
                        onChange={(e) => handleInputChange('contact', 'phone', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Address</label>
                      <textarea 
                        style={styles.textarea}
                        value={editedStudent.contact.address}
                        onChange={(e) => handleInputChange('contact', 'address', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Emergency Contact</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.contact.emergencyContact}
                        onChange={(e) => handleInputChange('contact', 'emergencyContact', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Email</label>
                      <div style={styles.formControl}>{student.contact.email}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Phone</label>
                      <div style={styles.formControl}>{student.contact.phone}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Address</label>
                      <div style={styles.formControl}>{student.contact.address}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Emergency Contact</label>
                      <div style={styles.formControl}>{student.contact.emergencyContact}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'academic' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-graduation-cap" style={styles.sectionIcon}></i> Academic Information
            </div>
            {editMode ? (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Major</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.academic.major}
                        onChange={(e) => handleInputChange('academic', 'major', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Minor</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.academic.minor}
                        onChange={(e) => handleInputChange('academic', 'minor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Academic Year</label>
                      <select 
                        style={styles.select}
                        value={editedStudent.academic.academicYear}
                        onChange={(e) => handleInputChange('academic', 'academicYear', e.target.value)}
                      >
                        <option value="Freshman (1st Year)">Freshman (1st Year)</option>
                        <option value="Sophomore (2nd Year)">Sophomore (2nd Year)</option>
                        <option value="Junior (3rd Year)">Junior (3rd Year)</option>
                        <option value="Senior (4th Year)">Senior (4th Year)</option>
                      </select>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Expected Graduation</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.academic.expectedGraduation}
                        onChange={(e) => handleInputChange('academic', 'expectedGraduation', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Academic Advisor</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.academic.advisor}
                        onChange={(e) => handleInputChange('academic', 'advisor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Enrollment Date</label>
                      <input 
                        type="text" 
                        style={styles.input}
                        value={editedStudent.academic.enrollmentDate}
                        onChange={(e) => handleInputChange('academic', 'enrollmentDate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Major</label>
                      <div style={styles.formControl}>{student.academic.major}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Minor</label>
                      <div style={styles.formControl}>{student.academic.minor}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Academic Year</label>
                      <div style={styles.formControl}>{student.academic.academicYear}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Expected Graduation</label>
                      <div style={styles.formControl}>{student.academic.expectedGraduation}</div>
                    </div>
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Academic Advisor</label>
                      <div style={styles.formControl}>{student.academic.advisor}</div>
                    </div>
                  </div>
                  <div style={styles.formColumn}>
                    <div style={styles.formGroup}>
                      <label style={styles.formLabel}>Enrollment Date</label>
                      <div style={styles.formControl}>{student.academic.enrollmentDate}</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'performance' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-chart-line" style={styles.sectionIcon}></i> Academic Performance
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>CGPA</label>
                  <div style={styles.formControl}>{student.performance.cgpa}</div>
                  <div style={styles.performanceBar}>
                    <div 
                      style={{...styles.performanceFill, width: `${student.performance.cgpaPercentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>SGPA</label>
                  <div style={styles.formControl}>{student.performance.sgpa}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Credits Completed</label>
                  <div style={styles.formControl}>{student.performance.credits}</div>
                  <div style={styles.performanceBar}>
                    <div 
                      style={{...styles.performanceFill, width: `${student.performance.creditsPercentage}%`}}
                    ></div>
                  </div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Academic Standing</label>
                  <div style={styles.formControl}>{student.performance.standing}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Honors</label>
                  <div style={styles.formControl}>{student.performance.honors}</div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-history" style={styles.sectionIcon}></i> Performance History
            </div>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Semester</th>
                  <th style={styles.tableCell}>SGPA</th>
                  <th style={styles.tableCell}>CGPA</th>
                  <th style={styles.tableCell}>Credits</th>
                  <th style={styles.tableCell}>Standing</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>Fall 2023</td>
                  <td style={styles.tableCell}>3.9</td>
                  <td style={styles.tableCell}>3.85</td>
                  <td style={styles.tableCell}>16</td>
                  <td style={styles.tableCell}>Dean's List</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Spring 2023</td>
                  <td style={styles.tableCell}>3.8</td>
                  <td style={styles.tableCell}>3.78</td>
                  <td style={styles.tableCell}>15</td>
                  <td style={styles.tableCell}>Dean's List</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Fall 2022</td>
                  <td style={styles.tableCell}>3.7</td>
                  <td style={styles.tableCell}>3.65</td>
                  <td style={styles.tableCell}>15</td>
                  <td style={styles.tableCell}>Good Standing</td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Spring 2022</td>
                  <td style={styles.tableCell}>3.6</td>
                  <td style={styles.tableCell}>3.55</td>
                  <td style={styles.tableCell}>14</td>
                  <td style={styles.tableCell}>Good Standing</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-calendar-check" style={styles.sectionIcon}></i> Attendance Statistics
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Current Semester</label>
                  <div style={styles.attendanceStats}>
                    <div style={styles.statItem}>
                      <div style={styles.statValue}>{student.attendance.present}%</div>
                      <div style={styles.statLabel}>Present</div>
                    </div>
                    <div style={styles.statItem}>
                      <div style={styles.statValue}>{student.attendance.absent}%</div>
                      <div style={styles.statLabel}>Absent</div>
                    </div>
                    <div style={styles.statItem}>
                      <div style={styles.statValue}>{student.attendance.late}%</div>
                      <div style={styles.statLabel}>Late</div>
                    </div>
                  </div>
                  <div style={styles.attendanceChart}>
                    <div style={{...styles.chartSegment, ...styles.presentSegment, width: `${student.attendance.present}%`}}></div>
                    <div style={{...styles.chartSegment, ...styles.absentSegment, width: `${student.attendance.absent}%`}}></div>
                    <div style={{...styles.chartSegment, ...styles.lateSegment, width: `${student.attendance.late}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-history" style={styles.sectionIcon}></i> Attendance History
            </div>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Semester</th>
                  <th style={styles.tableCell}>Present</th>
                  <th style={styles.tableCell}>Absent</th>
                  <th style={styles.tableCell}>Late</th>
                  <th style={styles.tableCell}>Excused</th>
                  <th style={styles.tableCell}>Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={styles.tableCell}>Fall 2023</td>
                  <td style={styles.tableCell}>92%</td>
                  <td style={styles.tableCell}>5%</td>
                  <td style={styles.tableCell}>3%</td>
                  <td style={styles.tableCell}>2%</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{width: '100px', marginRight: '10px'}}>
                        <div style={{background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                          <div style={{height: '100%', background: 'linear-gradient(90deg, #27ae60, #2ecc71)', width: '92%'}}></div>
                        </div>
                      </div>
                      <span>92%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Spring 2023</td>
                  <td style={styles.tableCell}>88%</td>
                  <td style={styles.tableCell}>7%</td>
                  <td style={styles.tableCell}>5%</td>
                  <td style={styles.tableCell}>3%</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{width: '100px', marginRight: '10px'}}>
                        <div style={{background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                          <div style={{height: '100%', background: 'linear-gradient(90deg, #27ae60, #2ecc71)', width: '88%'}}></div>
                        </div>
                      </div>
                      <span>88%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Fall 2022</td>
                  <td style={styles.tableCell}>85%</td>
                  <td style={styles.tableCell}>8%</td>
                  <td style={styles.tableCell}>7%</td>
                  <td style={styles.tableCell}>4%</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{width: '100px', marginRight: '10px'}}>
                        <div style={{background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                          <div style={{height: '100%', background: 'linear-gradient(90deg, #27ae60, #2ecc71)', width: '85%'}}></div>
                        </div>
                      </div>
                      <span>85%</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableCell}>Spring 2022</td>
                  <td style={styles.tableCell}>82%</td>
                  <td style={styles.tableCell}>10%</td>
                  <td style={styles.tableCell}>8%</td>
                  <td style={styles.tableCell}>5%</td>
                  <td style={styles.tableCell}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                      <div style={{width: '100px', marginRight: '10px'}}>
                        <div style={{background: '#e0e0e0', height: '8px', borderRadius: '4px', overflow: 'hidden'}}>
                          <div style={{height: '100%', background: 'linear-gradient(90deg, #27ae60, #2ecc71)', width: '82%'}}></div>
                        </div>
                      </div>
                      <span>82%</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-book" style={styles.sectionIcon}></i> Current Courses
            </div>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Course Code</th>
                  <th style={styles.tableCell}>Course Name</th>
                  <th style={styles.tableCell}>Credits</th>
                  <th style={styles.tableCell}>Grade</th>
                  <th style={styles.tableCell}>Instructor</th>
                  <th style={styles.tableCell}>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {student.courses.map((course, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{course.code}</td>
                    <td style={styles.tableCell}>{course.name}</td>
                    <td style={styles.tableCell}>{course.credits}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        background: course.grade.includes('A') ? '#e8f5e9' : 
                                 course.grade.includes('B') ? '#fff8e1' : '#ffebee',
                        color: course.grade.includes('A') ? '#2e7d32' : 
                               course.grade.includes('B') ? '#f57f17' : '#c62828',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '0.85rem'
                      }}>
                        {course.grade}
                      </span>
                    </td>
                    <td style={styles.tableCell}>{course.instructor}</td>
                    <td style={styles.tableCell}>{course.schedule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'financial' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-money-check-alt" style={styles.sectionIcon}></i> Financial Status
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Tuition Status</label>
                  <div style={student.financial.tuitionPaid ? styles.statusPaid : styles.statusUnpaid}>
                    {student.financial.tuitionPaid ? "Paid in Full" : "Payment Due"}
                  </div>
                </div>
              </div>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Account Balance</label>
                  <div style={styles.formControl}>{student.financial.balance}</div>
                </div>
              </div>
            </div>
            <div style={styles.formRow}>
              <div style={styles.formColumn}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Scholarships</label>
                  <div style={styles.formControl}>
                    {student.financial.scholarships.map((scholarship, index) => (
                      <span key={index} style={styles.tag}>{scholarship}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.sectionTitle} style={{marginTop: '30px'}}>
              <i className="fas fa-history" style={styles.sectionIcon}></i> Payment History
            </div>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Date</th>
                  <th style={styles.tableCell}>Description</th>
                  <th style={styles.tableCell}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {student.financial.paymentHistory.map((payment, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{payment.date}</td>
                    <td style={styles.tableCell}>{payment.description}</td>
                    <td style={styles.tableCell}>{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'documents' && (
          <div>
            <div style={styles.sectionTitle}>
              <i className="fas fa-file-alt" style={styles.sectionIcon}></i> Student Documents
            </div>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeader}>
                  <th style={styles.tableCell}>Document Name</th>
                  <th style={styles.tableCell}>Date</th>
                  <th style={styles.tableCell}>Type</th>
                  <th style={styles.tableCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {student.documents.map((document, index) => (
                  <tr key={index}>
                    <td style={styles.tableCell}>{document.name}</td>
                    <td style={styles.tableCell}>{document.date}</td>
                    <td style={styles.tableCell}>{document.type.toUpperCase()}</td>
                    <td style={styles.tableCell}>
                      <button style={{...styles.button, ...styles.secondaryButton, padding: '6px 12px', fontSize: '0.8rem'}}>
                        <i className="fas fa-download" style={styles.buttonIcon}></i> Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        {editMode ? (
          <>
            <button style={{...styles.button, ...styles.primaryButton}} onClick={handleEditToggle}>
              <i className="fas fa-save" style={styles.buttonIcon}></i> Save Changes
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}} onClick={handleCancelEdit}>
              <i className="fas fa-times" style={styles.buttonIcon}></i> Cancel
            </button>
          </>
        ) : (
          <>
            <button style={{...styles.button, ...styles.primaryButton}} onClick={handleEditToggle}>
              <i className="fas fa-edit" style={styles.buttonIcon}></i> Edit Profile
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}}>
              <i className="fas fa-file-alt" style={styles.buttonIcon}></i> View Transcript
            </button>
            <button style={{...styles.button, ...styles.secondaryButton}}>
              <i className="fas fa-calendar" style={styles.buttonIcon}></i> Schedule
            </button>
          </>
        )}
      </div>

      {/* Card Detail Popup */}
      <CardDetailPopup
        isOpen={popupOpen}
        onClose={handleClosePopup}
        cardType={selectedCard.type}
        currentData={selectedCard.data}
        pastData={pastData[selectedCard.type] || {}}
      />

      {/* Notes Popup */}
      <NotesPopup
        isOpen={notesPopupOpen}
        onClose={handleCloseNotesPopup}
        notes={student.notes}
      />
    </div>
  );
};

export default StudentDetails;