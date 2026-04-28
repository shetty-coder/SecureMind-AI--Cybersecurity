import React from "react";

const FilesOverlay = ({ open, onClose }) => {
if (!open) return null;

return (
<div style={overlay} onClick={() => onClose(false)}>

```
  <div style={box} onClick={(e)=> e.stopPropagation()}>

    <h2 style={{ marginBottom: "10px" }}>📁 Threat Logs & Reports</h2>
    <p style={{ opacity: 0.7 }}>System generated files</p>

    {/* FILE LIST */}
    <div style={{ marginTop: "20px" }}>
      {files.map((f, i) => (
        <div
          key={i}
          style={fileItem}
          onMouseEnter={(e)=> e.currentTarget.style.background="#374151"}
          onMouseLeave={(e)=> e.currentTarget.style.background="transparent"}
        >
          <span>📄 {f.name}</span>
          <span style={{ color: "#38bdf8" }}>{f.size}</span>
        </div>
      ))}
    </div>

    {/* RECENT ACTIVITY */}
    <div style={{ marginTop: "20px" }}>
      <h4>📊 Recent Activity</h4>
      <ul style={{ marginTop: "10px", opacity: 0.8 }}>
        <li>⚠️ DDoS log generated</li>
        <li>📁 Intrusion report saved</li>
        <li>📊 Traffic data updated</li>
      </ul>
    </div>

    {/* BUTTON */}
    <button
      style={btn}
      onClick={() => onClose(false)}
      onMouseEnter={(e)=> e.currentTarget.style.background="#2563eb"}
      onMouseLeave={(e)=> e.currentTarget.style.background="#3b82f6"}
    >
      Close
    </button>

  </div>
</div>


);
};

/* ---------- STYLES ---------- */

const overlay = {
position: "fixed",
top: 0,
left: 0,
width: "100%",
height: "100%",
background: "rgba(0,0,0,0.6)",
backdropFilter: "blur(6px)",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex: 1000
};

const box = {
background: "#1e293b",
padding: "25px",
borderRadius: "16px",
width: "450px",
color: "white",
animation: "zoomIn 0.3s ease",
boxShadow: "0 0 25px rgba(59,130,246,0.4)"
};

const fileItem = {
display: "flex",
justifyContent: "space-between",
padding: "10px",
borderRadius: "8px",
cursor: "pointer",
transition: "0.3s"
};

const btn = {
marginTop: "20px",
padding: "10px",
border: "none",
borderRadius: "8px",
background: "#3b82f6",
color: "white",
cursor: "pointer"
};

/* ---------- DATA ---------- */

const files = [
{ name: "alerts_log.csv", size: "2.1MB" },
{ name: "intrusion_report.pdf", size: "1.4MB" },
{ name: "network_data.json", size: "3.2MB" }
];

export default FilesOverlay;
