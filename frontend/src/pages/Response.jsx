import React from "react";

const Response = ({ theme }) => {
const handleAction = async (actionType) => {
  try {
    const response = await fetch("http://localhost:5000/api/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: actionType }),
    });
    const data = await response.json();
    alert(`Action executed: ${data.message}`);
  } catch (error) {
    console.error("Error executing action:", error);
    alert("Failed to connect to backend");
  }
};

return (
<div style={{
padding: "20px",
width: "100%",
background: theme === "dark" ? "#0f172a" : "#f8fafc",
minHeight: "100vh",
color: theme === "dark" ? "white" : "black"
}}>

```
  <h1>⚡ Incident Response Center</h1>

  {/* SUMMARY CARDS */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginTop: "20px"
  }}>
    <Card title="Blocked IPs" value="45" color="#ef4444" theme={theme}/>
    <Card title="Quarantined Devices" value="12" color="#facc15" theme={theme}/>
    <Card title="Auto Responses" value="67" color="#22c55e" theme={theme}/>
    <Card title="Pending Actions" value="5" color="#38bdf8" theme={theme}/>
  </div>

  {/* ACTION TABLE */}
  <div style={{ ...card(theme), marginTop: "25px" }}>
    <h3>⚙️ Response Actions</h3>

    <table style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Threat</th>
          <th>Action Taken</th>
          <th>Status</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {actions.map((a, i) => (
          <tr key={i}>
            <td>{a.threat}</td>
            <td>{a.action}</td>
            <td style={{ color: a.status === "Completed" ? "#22c55e" : "#facc15" }}>
              {a.status}
            </td>
            <td>{a.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* PLAYBOOKS (AI SUGGESTIONS) */}
  <div style={{ ...card(theme), marginTop: "25px" }}>
    <h3>🧠 AI Recommended Actions</h3>

    <ul>
      <li>🔒 Isolate infected device</li>
      <li>🚫 Block suspicious IP range</li>
      <li>🔍 Perform deep packet inspection</li>
      <li>📧 Alert admin team</li>
    </ul>
  </div>

  {/* TIMELINE */}
  <div style={{ ...card(theme), marginTop: "25px" }}>
    <h3>📊 Threat Timeline</h3>

    <ul>
      <li>10:01 AM → Suspicious traffic detected</li>
      <li>10:02 AM → AI flagged anomaly</li>
      <li>10:03 AM → Auto-block executed</li>
      <li>10:05 AM → System stabilized</li>
    </ul>
  </div>

  {/* MANUAL CONTROLS */}
  <div style={{ ...card(theme), marginTop: "25px" }}>
    <h3>🛠️ Manual Controls</h3>

    <div style={{ display: "flex", gap: "10px" }}>
      <button style={btn} onClick={() => handleAction("block_ip")}>Block IP</button>
      <button style={btn} onClick={() => handleAction("lock_account")}>Disconnect Device</button>
      <button style={btn} onClick={() => handleAction("escalate")}>Escalate Case</button>
    </div>
  </div>

</div>


);
};

/* ---------- Components ---------- */

const Card = ({ title, value, color, theme }) => (

  <div style={{
    background: theme === "dark" ? "#1e293b" : "white",
    padding: "15px",
    borderRadius: "10px"
  }}>
    <h4>{title}</h4>
    <h1 style={{ color }}>{value}</h1>
  </div>
);

const card = (theme) => ({
background: theme === "dark" ? "#1e293b" : "white",
padding: "20px",
borderRadius: "10px",
boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
});

const btn = {
padding: "10px",
border: "none",
borderRadius: "6px",
cursor: "pointer",
background: "#2563eb",
color: "white"
};

/* ---------- Data ---------- */

const actions = [
{ threat: "DDoS Attack", action: "Blocked IP", status: "Completed", time: "2 min ago" },
{ threat: "Brute Force", action: "Account Locked", status: "Completed", time: "5 min ago" },
{ threat: "Malware", action: "Quarantined Device", status: "Pending", time: "1 min ago" }
];

export default Response;
