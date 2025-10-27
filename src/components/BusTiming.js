import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBus, FaClock, FaRoute, FaArrowRight, FaMapMarkerAlt, FaExchangeAlt, FaHourglassHalf, FaPlay, FaLocationArrow } from "react-icons/fa";

export default function BusTimingArrow() {
  const firstBusTime = "06:30 AM";
  const lastBusTime = "08:30 PM";
  const routes = ["JJ", "BN", "Old Gunpur"];
  const durationMap = { JJ: 40, BN: 45, "Old Gunpur": 50 };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [directionFilter, setDirectionFilter] = useState("From GIET");
  const [visibleBuses, setVisibleBuses] = useState([]);
  const [expandedBus, setExpandedBus] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  const generateBuses = () => {
    const buses = [];
    let busNumber = 1;
    let currentBusTime = getTime(firstBusTime);
    const endTime = getTime(lastBusTime);

    while (currentBusTime <= endTime) {
      const route = routes[(busNumber - 1) % routes.length];
      const depTime = new Date(currentBusTime);
      const arrTime = new Date(depTime.getTime() + durationMap[route] * 60000);

      buses.push({
        direction: "From GIET",
        time: depTime,
        route,
        busNumber: `B${busNumber}`,
        stops: ["GIET", route],
        duration: durationMap[route],
      });

      buses.push({
        direction: "From Outside",
        time: arrTime,
        route,
        busNumber: `B${busNumber}`,
        stops: [route, "GIET"],
        duration: durationMap[route],
      });

      currentBusTime = new Date(currentBusTime.getTime() + 60 * 60000);
      busNumber++;
    }
    return buses;
  };

  const busSchedule = generateBuses();

  useEffect(() => {
    const filteredBuses = busSchedule.filter(
      (bus) => bus.direction === directionFilter
    );
    const nextBusIndex = filteredBuses.findIndex((bus) => bus.time > currentTime);
    const upcoming = nextBusIndex !== -1 ? filteredBuses.slice(nextBusIndex, nextBusIndex + 3) : [];
    setVisibleBuses(upcoming);
  }, [currentTime, directionFilter]);

  const getTimeUntilBus = (busTime) => {
    const diff = busTime - currentTime;
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return { minutes, seconds };
  };

  const routeColors = {
    JJ: { bg: "#eff6ff", border: "#3b82f6", text: "#1e40af" },
    BN: { bg: "#f0fdf4", border: "#22c55e", text: "#166534" },
    "Old Gunpur": { bg: "#fffbeb", border: "#f59e0b", text: "#92400e" }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "30px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f8fafc",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "36px",
      fontWeight: 700,
      color: "#1e293b",
      marginBottom: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
    },
    digitalClock: {
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "white",
      padding: "10px 20px",
      borderRadius: "30px",
      fontSize: "16px",
      fontWeight: 600,
      color: "#334155",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      border: "1px solid #e2e8f0",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      gap: "15px",
      marginBottom: "30px",
    },
    controlButton: (active) => ({
      padding: "12px 24px",
      borderRadius: "12px",
      border: "1px solid #e2e8f0",
      cursor: "pointer",
      background: active ? "#3b82f6" : "white",
      color: active ? "white" : "#475569",
      fontWeight: 600,
      fontSize: "15px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    timeline: {
      position: "relative",
      paddingLeft: "30px",
    },
    timelineLine: {
      position: "absolute",
      left: "15px",
      top: "0",
      bottom: "0",
      width: "2px",
      background: "#e2e8f0",
    },
    busCard: (routeColor, index) => ({
      position: "relative",
      background: "white",
      borderRadius: "16px",
      padding: "20px",
      marginBottom: "20px",
      border: `1px solid ${routeColor.border}`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }),
    busCardHover: {
      transform: "translateX(8px)",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    },
    timelineDot: (routeColor) => ({
      position: "absolute",
      left: "-22px",
      top: "24px",
      width: "14px",
      height: "14px",
      borderRadius: "50%",
      background: "white",
      border: `3px solid ${routeColor.border}`,
      zIndex: 2,
    }),
    busHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "15px",
    },
    routeInfo: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    routeIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px",
      color: "white",
      background: routeColor => routeColor.border,
    },
    routeName: {
      fontSize: "18px",
      fontWeight: 600,
      color: "#1e293b",
    },
    timeBadge: {
      background: "#f1f5f9",
      padding: "6px 12px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 500,
      color: "#475569",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    countdown: {
      fontSize: "32px",
      fontWeight: 700,
      color: "#1e293b",
      margin: "15px 0",
      display: "flex",
      alignItems: "baseline",
      gap: "6px",
    },
    countdownUnit: {
      fontSize: "14px",
      fontWeight: 400,
      color: "#64748b",
    },
    busDetails: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      marginTop: "15px",
      paddingTop: "15px",
      borderTop: "1px solid #f1f5f9",
    },
    detailRow: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "14px",
      color: "#64748b",
    },
    progressBar: {
      height: "4px",
      background: "#f1f5f9",
      borderRadius: "2px",
      margin: "12px 0",
      overflow: "hidden",
    },
    progressFill: (percentage) => ({
      height: "100%",
      width: `${percentage}%`,
      background: "#3b82f6",
      borderRadius: "2px",
      transition: "width 1s ease",
    }),
    nextBusLabel: {
      position: "absolute",
      top: "-10px",
      left: "20px",
      background: "#ef4444",
      color: "white",
      padding: "4px 10px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: 600,
    },
    emptyState: {
      textAlign: "center",
      padding: "60px 20px",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      border: "1px solid #e2e8f0",
    },
    emptyIcon: {
      fontSize: "48px",
      color: "#cbd5e1",
      marginBottom: "16px",
    },
    emptyTitle: {
      fontSize: "20px",
      fontWeight: 600,
      color: "#1e293b",
      margin: "0 0 8px 0",
    },
    emptyText: {
      color: "#64748b",
      margin: 0,
    },
    expandIcon: {
      transition: "transform 0.3s ease",
    },
    expanded: {
      transform: "rotate(90deg)",
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>
          <FaBus style={{ color: "#3b82f6" }} />
          Bus Schedule
        </h1>
        <div style={styles.digitalClock}>
          <FaClock />
          {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </div>
      </div>

      <div style={styles.controls}>
        <button
          style={styles.controlButton(directionFilter === "From GIET")}
          onClick={() => setDirectionFilter("From GIET")}
        >
          <FaMapMarkerAlt />
          From GIET
        </button>
        <button
          style={styles.controlButton(directionFilter === "From Outside")}
          onClick={() => setDirectionFilter("From Outside")}
        >
          <FaMapMarkerAlt />
          From Outside
        </button>
      </div>

      {visibleBuses.length > 0 ? (
        <div style={styles.timeline}>
          <div style={styles.timelineLine} />
          
          {visibleBuses.map((bus, index) => {
            const timeUntil = getTimeUntilBus(bus.time);
            const progressPercentage = Math.min(100, (timeUntil.minutes / 60) * 100);
            const routeColor = routeColors[bus.route];
            const isExpanded = expandedBus === bus.busNumber;
            
            return (
              <motion.div
                key={bus.busNumber + bus.time}
                style={styles.busCard(routeColor, index)}
                whileHover={styles.busCardHover}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setExpandedBus(isExpanded ? null : bus.busNumber)}
              >
                {index === 0 && <div style={styles.nextBusLabel}>NEXT BUS</div>}
                
                <div style={styles.timelineDot(routeColor)} />
                
                <div style={styles.busHeader}>
                  <div style={styles.routeInfo}>
                    <div style={styles.routeIcon}>
                      {bus.route.charAt(0)}
                    </div>
                    <div>
                      <div style={styles.routeName}>Route {bus.route}</div>
                      <div style={{ fontSize: "14px", color: "#64748b" }}>
                        {bus.busNumber}
                      </div>
                    </div>
                  </div>
                  
                  <div style={styles.timeBadge}>
                    <FaClock />
                    {bus.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>

                <div style={styles.countdown}>
                  {timeUntil.minutes}:{timeUntil.seconds.toString().padStart(2, '0')}
                  <span style={styles.countdownUnit}>min</span>
                </div>

                <div style={styles.progressBar}>
                  <div style={styles.progressFill(progressPercentage)} />
                </div>

                {isExpanded && (
                  <motion.div 
                    style={styles.busDetails}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div style={styles.detailRow}>
                      <FaRoute />
                      <span>{bus.stops.join(" → ")}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <FaHourglassHalf />
                      <span>Duration: {bus.duration} minutes</span>
                    </div>
                    <div style={styles.detailRow}>
                      <FaExchangeAlt />
                      <span>{bus.direction}</span>
                    </div>
                  </motion.div>
                )}

                <div style={{ 
                  position: "absolute", 
                  right: "20px", 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  color: "#64748b"
                }}>
                  <FaArrowRight style={{ 
                    ...styles.expandIcon,
                    ...(isExpanded ? styles.expanded : {})
                  }} />
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <FaBus />
          </div>
          <h3 style={styles.emptyTitle}>No buses available</h3>
          <p style={styles.emptyText}>There are no more buses scheduled for today</p>
        </div>
      )}
    </div>
  );
}