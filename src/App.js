// src/App.js
import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

// Import components from components folder
import LeaveForm from "./components/LeaveForm";
import NoticeBoard from "./components/NoticeBoard";
import ComplaintBox from "./components/ComplaintBox";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { UserProvider, UserContext } from "./components/UserContext";
import BusTiming from "./components/BusTiming";
import StudentDetails from "./components/StudentDetails";
import Dashboard from "./components/Dashboard"; // Import the Dashboard component

// Import admin components
import AdminNavbar from "./components/Admin/AdminNavbar";
import HolidayList from "./components/Admin/HolidayList";
import LeaveNoticeManagement from "./components/Admin/LeaveNoticeManagement";
import NoticeManagement from "./components/Admin/NoticeManagement";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ClassTeacherDetails from "./components/Admin/ClassTeacherDetails";

// Admin route protection component
const AdminRoute = () => {
  const { user } = useContext(UserContext);
  
  if (!user || (user.role !== "ClassTeacher" && user.role !== "BusManager")) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Student route protection component
const StudentRoute = () => {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Wrapper to hide Navbar on login page and show appropriate navbar
function Layout({ children }) {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const hideNavbar = location.pathname === "/login";
  const isAdminRoute = location.pathname.startsWith("/admin");
  
  return (
    <>
      {!hideNavbar && (
        isAdminRoute && user?.role && (user.role === "ClassTeacher" || user.role === "BusManager") 
          ? <AdminNavbar /> 
          : <Navbar />
      )}
      {children}
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <UserProvider value={{ user, setUser }}>
      <Router>
        <Layout>
          <Routes>
            {/* Default route → Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Student Pages - Protected */}
            <Route element={<StudentRoute />}>
              <Route path="/dashboard" element={<Dashboard />} /> {/* Student Dashboard Route */}
              <Route path="/leaveform" element={<LeaveForm />} />
              <Route path="/notice" element={<NoticeBoard />} />
              <Route path="/complaint" element={<ComplaintBox />} />
              <Route path="/bustiming" element={<BusTiming />} />
              <Route path="/student-details" element={<StudentDetails />} />
            </Route>

            {/* Admin Pages - Protected */}
            <Route element={<AdminRoute />}>
              {/* Class Teacher Routes */}
              <Route path="/admin/class-teacher" element={<Navigate to="/admin/class-teacher/AdminDashboard" replace />} />
              <Route path="/admin/class-teacher/holidays" element={<HolidayList />} />
              <Route path="/admin/class-teacher/leave" element={<LeaveNoticeManagement />} />
              <Route path="/admin/class-teacher/notices" element={<NoticeManagement />} />
              <Route path="/admin/class-teacher/AdminDashboard" element={<AdminDashboard />} />
              // Add this to your admin routes
            <Route path="/admin/class-teacher/teacher" element={<ClassTeacherDetails />} />
              
              {/* Bus Manager Routes */}
              <Route path="/admin/bus-manager" element={<Navigate to="/admin/bus-manager/holidays" replace />} />
              <Route path="/admin/bus-manager/holidays" element={<HolidayList />} />
              <Route path="/admin/bus-manager/leave" element={<LeaveNoticeManagement />} />
              <Route path="/admin/bus-manager/notices" element={<NoticeManagement />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}