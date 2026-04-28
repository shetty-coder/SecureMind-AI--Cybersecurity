import React from "react";

const Alerts = ({ theme }) => {
return (
<div style={{
padding: "20px",
width: "100%",
background: theme === "dark" ? "#0f172a" : "#f8fafc",
minHeight: "100vh",
color: theme === "dark" ? "white" : "black"
}}>

```
  <h1>Detection & Response 🚨</h1>

  {/* TOP CARDS */}
  <div style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "20px"
  }}>

    {/* Alerts Summary */}
    <div style={card(theme)}>
      <h3>Alerts</h3>

      <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "20px"
      }}>
        <Circle value="511" label="Open" color="#22c55e" />
        <Circle value="8" label="Ack" color="#facc15" />
        <Circle value="15" label="Closed" color="#ef4444" />
      </div>
    </div>

    {/* Cases */}
    <div style={card(theme)}>
      <h3>Cases</h3>

      <div style={{ marginTop: "20px" }}>
        <Bar label="Open" value={80} />
        <Bar label="In Progress" value={50} />
        <Bar label="Closed" value={20} />
      </div>
    </div>

  </div>

  {/* ALERTS TABLE */}
  <div style={{ ...card(theme), marginTop: "20px" }}>
    <h3>Open Alerts by Rule</h3>

    <table style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr style={{ textAlign: "left" }}>
          <th>Rule</th>
          <th>Last Alert</th>
          <th>Count</th>
          <th>Severity</th>
        </tr>
      </thead>

      <tbody>
        {alerts.map((a, i) => (
          <tr key={i}>
            <td>{a.rule}</td>
            <td>{a.time}</td>
            <td>{a.count}</td>
            <td style={{ color: getColor(a.severity) }}>
              {a.severity}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* RECENT CASES */}
  <div style={{ ...card(theme), marginTop: "20px" }}>
    <h3>Recent Cases</h3>

    <table style={{ width: "100%", marginTop: "10px" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Time</th>
        </tr>
      </thead>

      <tbody>
        {cases.map((c, i) => (
          <tr key={i}>
            <td>{c.name}</td>
            <td style={{ color: c.status === "Open" ? "#22c55e" : "#aaa" }}>
              {c.status}
            </td>
            <td>{c.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>


);
};

/* ---------- Components ---------- */

const Circle = ({ value, label, color }) => (

  <div style={{ textAlign: "center" }}>
    <div style={{
      width: "70px",
      height: "70px",
      borderRadius: "50%",
      border: `5px solid ${color}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto"
    }}>
      {value}
    </div>
    <p>{label}</p>
  </div>
);

const Bar = ({ label, value }) => (

  <div style={{ marginBottom: "10px" }}>
    <p>{label}</p>
    <div style={{
      height: "8px",
      background: "#1e293b",
      borderRadius: "5px"
    }}>
      <div style={{
        width: value + "%",
        height: "100%",
        background: "#38bdf8",
        borderRadius: "5px"
      }} />
    </div>
  </div>
);

const card = (theme) => ({
background: theme === "dark" ? "#1e293b" : "white",
padding: "15px",
borderRadius: "12px",
boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
});

/* ---------- Data ---------- */

const alerts = [
{ rule: "DDoS Attack", time: "5 min ago", count: 23, severity: "High" },
{ rule: "Brute Force", time: "10 min ago", count: 12, severity: "Medium" },
{ rule: "Suspicious Login", time: "2 min ago", count: 5, severity: "Low" }
];

const cases = [
{ name: "Malware detected", status: "Open", time: "Today" },
{ name: "Phishing email", status: "Closed", time: "Yesterday" }
];

const getColor = (s) =>
s === "High" ? "red" : s === "Medium" ? "orange" : "green";

export default Alerts;
