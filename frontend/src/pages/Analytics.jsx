import React, { useState, useEffect } from "react";

const Analytics = ({ theme }) => {

  // ✅ Static stats (same as before)
  const stats = [
    { title: "Engaged Sessions", value: "1,158" },
    { title: "Engagement Rate", value: "24.31%" },
    { title: "Sessions", value: "755" },
    { title: "Events", value: "35.55" },
    { title: "Active Users", value: "982" },
    { title: "Avg Time", value: "00:00:21" },
    { title: "New Users", value: "841" },
    { title: "Conversions", value: "931" }
  ];

  // ✅ Live sessions state
  const [sessions, setSessions] = useState([]);

  // ✅ Generate fake live data
  useEffect(() => {
    const generateData = () => {
      const newData = [
        { amount: Math.floor(Math.random() * 2000), result: "Attack Detected" },
        { amount: Math.floor(Math.random() * 1000), result: "Normal Traffic" },
        { amount: Math.floor(Math.random() * 1500), result: "Attack Detected" },
        { amount: Math.floor(Math.random() * 500), result: "Normal Traffic" }
      ];

      setSessions(newData);
    };

    generateData();

    const interval = setInterval(generateData, 2000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Card style
  const card = (theme) => ({
    background: theme === "dark" ? "#1e293b" : "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow:
      theme === "dark"
        ? "0 0 10px rgba(0,0,0,0.5)"
        : "0 2px 10px rgba(0,0,0,0.1)",
    transition: "0.3s"
  });

  return (
    <div
      style={{
        padding: "20px",
        width: "100%",
        background: theme === "dark" ? "#0f172a" : "#f1f5f9",
        minHeight: "100vh",
        color: theme === "dark" ? "white" : "black"
      }}
    >
      {/* Header */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Web Analytics Dashboard
      </h1>

      {/* Top Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px"
        }}
      >
        {/* 🔥 Sessions (LIVE FAKE DATA) */}
        <div style={card(theme)}>
          <h3>Sessions</h3>

          <div
            style={{
              height: "150px",
              background: theme === "dark" ? "#020617" : "#e2e8f0",
              borderRadius: "10px",
              overflowY: "auto",
              padding: "10px"
            }}
          >
            {sessions.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  borderBottom: "1px solid #333",
                  paddingBottom: "5px"
                }}
              >
                <span>
                  Time: {new Date().toLocaleTimeString()}
                </span>

                <span>Amount: {item.amount}</span>

                <span
                  style={{
                    color:
                      item.result === "Attack Detected"
                        ? "red"
                        : "green"
                  }}
                >
                  {item.result}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Devices Pie */}
        <div style={card(theme)}>
          <h3>Devices</h3>

          <div
            style={{
              height: "150px",
              borderRadius: "50%",
              background:
                "conic-gradient(#22c55e 40%, #facc15 60%)",
              width: "120px",
              margin: "auto"
            }}
          />

          <p style={{ textAlign: "center", marginTop: "10px" }}>
            Total: 249
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
          marginTop: "20px"
        }}
      >
        {stats.map((item, i) => (
          <div key={i} style={card(theme)}>
            <h4>{item.title}</h4>
            <h2>{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;