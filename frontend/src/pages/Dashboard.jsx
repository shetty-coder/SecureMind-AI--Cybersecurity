import React, { useState, useEffect } from "react";

const Dashboard = ({ theme, setPage }) => {
  const [liveTraffic, setLiveTraffic] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [showAlertBox, setShowAlertBox] = useState(false); // NEW
  const [history, setHistory] = useState([]); // OPTIONAL history

  // 🔁 FETCH LIVE DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/detect");
        if (response.ok) {
          setIsConnected(true);
          const data = await response.json();

          const mappedData = data.map(item => ({
            timestamp: Date.now() / 1000,
            amount: item.src_bytes,
            fraud_probability: item.result === "Attack Detected" ? 0.99 : 0.01,
            status: item.result === "Attack Detected" ? "Suspicious" : "Normal"
          }));

          // check attack
          const attackFound = mappedData.some(p => p.status === "Suspicious");

          if (attackFound) {
            setShowAlertBox(true);
            setHistory(prev => [...prev, "Attack at " + new Date().toLocaleTimeString()]);
          }

          setLiveTraffic(prev => {
            const newTraffic = [...mappedData, ...prev];
            return newTraffic.slice(0, 10);
          });
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setIsConnected(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{
      padding: "20px",
      width: "100%",
      background: theme === "dark" ? "#0f172a" : "#f8fafc",
      minHeight: "100vh",
      color: theme === "dark" ? "white" : "black"
    }}>

      <h1>AI Intrusion Dashboard 🚀</h1>

      {/* 🚨 ALERT BOX (MAIN FIX) */}
      {showAlertBox && (
        <div style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          background: "#1e293b",
          padding: "20px",
          borderRadius: "12px",
          zIndex: 999,
          width: "250px"
        }}>
          <h3 style={{ color: "#ef4444" }}>⚠ Attack Detected</h3>

          <button
            style={btn}
            onClick={() => setPage("verification")}
          >
            Verify User
          </button>

          <button
            style={btn}
            onClick={() => {
              alert("User Blocked 🚫");
              setShowAlertBox(false);
            }}
          >
            Block Access
          </button>

          <button
            style={btn}
            onClick={() => setShowAlertBox(false)}
          >
            Ignore
          </button>
        </div>
      )}

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "20px"
      }}>

        <div style={cardStyle(theme)} onClick={() => setPage("alerts")}>
          <h3>Alerts</h3>
          <h1 style={{ color: "#ef4444" }}>View</h1>
        </div>

        <div style={cardStyle(theme)} onClick={() => setPage("analytics")}>
          <h3>Analytics</h3>
          <h1 style={{ color: "#22c55e" }}>View</h1>
        </div>

        <div style={cardStyle(theme)} onClick={() => setPage("response")}>
          <h3>Response</h3>
          <h1 style={{ color: "#facc15" }}>View</h1>
        </div>

        <div style={cardStyle(theme)} onClick={() => setPage("verification")}>
          <h3>Verification</h3>
          <h1 style={{ color: "#38bdf8" }}>Check</h1>
        </div>
      </div>

      {/* Live Traffic */}
      <div style={{
        ...cardStyle(theme),
        marginTop: "30px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Live Traffic ML Analysis</h2>
          <span style={{ color: isConnected ? "#22c55e" : "#ef4444" }}>
            {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
          </span>
        </div>

        <div style={{
          marginTop: "20px",
          background: theme === "dark" ? "#0f172a" : "#e2e8f0",
          padding: "15px",
          borderRadius: "10px",
          maxHeight: "250px",
          overflowY: "auto"
        }}>
          {liveTraffic.map((packet, idx) => (
            <div key={idx} style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              borderBottom: "1px solid #334155",
              color: packet.status === "Suspicious" ? "#ef4444" : "white"
            }}>
              <span>{new Date(packet.timestamp * 1000).toLocaleTimeString()}</span>
              <span>{packet.amount}</span>
              <span>{(packet.fraud_probability * 100).toFixed(2)}%</span>
              <span>
                {packet.status === "Suspicious" ? "🚨 ALERT" : "✅ NORMAL"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* OPTIONAL HISTORY */}
      <div style={{ marginTop: "20px" }}>
        <h3>Attack History</h3>
        {history.map((h, i) => (
          <div key={i}>{h}</div>
        ))}
      </div>

    </div>
  );
};

const cardStyle = (theme) => ({
  background: theme === "dark" ? "#1e293b" : "white",
  padding: "20px",
  borderRadius: "12px",
  cursor: "pointer"
});

const btn = {
  display: "block",
  marginTop: "10px",
  padding: "8px",
  width: "100%",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

export default Dashboard;