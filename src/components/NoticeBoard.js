import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NoticeBoard() {
  const [notices] = useState([
    {
      id: 1,
      title: "Holiday Notice",
      date: "02 Sept 2025",
      description:
        "This is to inform all students that the college will remain closed on 5th September on account of Teacher’s Day celebration."
    },
    {
      id: 2,
      title: "Mid-Semester Examination",
      date: "28 Aug 2025",
      description:
        "The Mid-Semester Examinations will commence from 10th September 2025. Detailed timetable will be displayed on the college website and notice board."
    },
    {
      id: 3,
      title: "Workshop on AI & ML",
      date: "20 Aug 2025",
      description:
        "A workshop on Artificial Intelligence & Machine Learning will be conducted on 8th September 2025 in Lab-2, organized by the Department of CSE."
    }
  ]);

  return (
    <div className="container mt-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card border-0 shadow-sm rounded-3 p-4"
      >
        {/* Notice Header */}
        <div className="text-center mb-4">
          <h3 className="fw-bold text-uppercase">Official Notice Board</h3>
          <p className="text-muted mb-0">GIET University, Gunupur</p>
          <hr />
        </div>

        {/* Notices */}
        <div>
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="border rounded-3 p-3 mb-4 bg-white"
              style={{ borderLeft: "4px solid #0d6efd" }}
            >
              <h5 className="fw-bold mb-1">{notice.title}</h5>
              <small className="text-muted">{notice.date}</small>
              <p className="mt-2 mb-0 text-secondary" style={{ lineHeight: "1.6" }}>
                {notice.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-end mt-3">
          <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
            — By Order of Principal
          </p>
        </div>
      </motion.div>
    </div>
  );
}