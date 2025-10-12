// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Import components from components folder
import LeaveForm from "./components/LeaveForm";
import NoticeBoard from "./components/NoticeBoard";
import ComplaintBox from "./components/ComplaintBox";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import { UserProvider } from "./components/UserContext";
import BusTiming from "./components/BusTiming";

// Wrapper to hide Navbar on login page
function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
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

            {/* Pages */}
            <Route path="/leaveform" element={<LeaveForm />} />
            <Route path="/notice" element={<NoticeBoard />} />
            <Route path="/complaint" element={<ComplaintBox />} />
            <Route path="/bustiming" element={<BusTiming />} />

            {/* Fallback */}
            <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
          </Routes>
        </Layout>
      </Router>
    </UserProvider>
  );
}
