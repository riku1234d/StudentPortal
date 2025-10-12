import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function BusTimingArrow() {
  const firstBusTime = "06:30 AM";
  const lastBusTime = "08:30 PM";
  const routes = ["JJ", "BN", "Old Gunpur"];
  const durationMap = { JJ: 40, BN: 45, "Old Gunpur": 50 };

  const [currentTime, setCurrentTime] = useState(new Date());
  const [directionFilter, setDirectionFilter] = useState("From GIET");
  const [visibleBuses, setVisibleBuses] = useState([]);

  // Update current time every second for real-time effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Convert time string (e.g. "06:30 AM") to Date object for today
  const getTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Generate all buses for the day
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

  // Update visible buses automatically whenever time or direction changes
  useEffect(() => {
    const filteredBuses = busSchedule.filter(
      (bus) => bus.direction === directionFilter
    );
    const nextBusIndex = filteredBuses.findIndex((bus) => bus.time > currentTime);
    const upcoming = nextBusIndex !== -1 ? filteredBuses.slice(nextBusIndex, nextBusIndex + 3) : [];
    setVisibleBuses(upcoming);
  }, [currentTime, directionFilter]); // Re-run every second

  const routeColors = { JJ: "#64B5F6", BN: "#81C784", "Old Gunpur": "#FFB74D" };
  const directionColors = { "From GIET": "#42A5F5", "From Outside": "#EF5350" };

  const styles = {
    container: {
      maxWidth: "700px",
      margin: "40px auto",
      padding: "25px",
      fontFamily: "Arial, sans-serif",
      borderRadius: "20px",
      background: "#F3F4F6",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
    title: { textAlign: "center", color: "#444", fontSize: "24px", marginBottom: "20px" },
    buttons: { display: "flex", justifyContent: "center", gap: "15px", marginBottom: "25px" },
    button: (active) => ({
      padding: "10px 20px",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      backgroundColor: active ? "#90CAF9" : "#E0E0E0",
      color: active ? "#fff" : "#555",
      fontWeight: 600,
      transition: "all 0.3s",
    }),
    timeline: { display: "flex", flexDirection: "column", gap: "20px", position: "relative" },
    card: (routeColor) => ({
      padding: "18px 22px",
      borderRadius: "14px",
      backgroundColor: "#fff",
      borderLeft: `6px solid ${routeColor}`,
      boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
      color: "#333",
      position: "relative",
      overflow: "visible",
    }),
    time: { fontWeight: 600, fontSize: "17px" },
    route: { fontWeight: 500, marginTop: "4px", fontSize: "15px" },
    info: { fontSize: "14px", marginTop: "2px", color: "#555" },
    directionBadge: (direction) => ({
      position: "absolute",
      top: "10px",
      right: "12px",
      backgroundColor: directionColors[direction],
      color: "#fff",
      fontWeight: 600,
      fontSize: "12px",
      padding: "4px 10px",
      borderRadius: "12px",
    }),
    pointer: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: "28px",
      color: "#FF9800",
    },
    noBus: { textAlign: "center", marginTop: "25px", color: "#777", fontWeight: 500 },
    clock: { textAlign: "center", marginBottom: "10px", color: "#555", fontSize: "16px" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.clock}>
        ⏰ Current Time:{" "}
        {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>

      <div style={styles.buttons}>
        <button
          style={styles.button(directionFilter === "From GIET")}
          onClick={() => setDirectionFilter("From GIET")}
        >
          From GIET
        </button>
        <button
          style={styles.button(directionFilter === "From Outside")}
          onClick={() => setDirectionFilter("From Outside")}
        >
          From Outside
        </button>
      </div>

      <div style={styles.timeline}>
        {visibleBuses.length > 0 ? (
          visibleBuses.map((bus, index) => (
            <div key={bus.busNumber + bus.time} style={styles.card(routeColors[bus.route])}>
              <div style={styles.directionBadge(bus.direction)}>{bus.direction}</div>
              <div style={styles.time}>
                {bus.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div style={styles.route}>{bus.route}</div>
              <div style={styles.info}>Bus No: {bus.busNumber}</div>
              <div style={styles.info}>Stops: {bus.stops.join(" → ")}</div>
              <div style={styles.info}>Duration: {bus.duration} mins</div>

              {index === 0 && (
                <motion.div
                  style={styles.pointer}
                  animate={{ x: [0, -8, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ➤
                </motion.div>
              )}
            </div>
          ))
        ) : (
          <div style={styles.noBus}>No more buses today</div>
        )}
      </div>
    </div>
  );
}
