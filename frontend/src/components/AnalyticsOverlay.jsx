import React from "react";

const AnalyticsOverlay = ({ open, onClose }) => {
if (!open) return null;

return (
<div style={overlayStyle} onClick={() => onClose(false)}>

```
  <div
    style={boxStyle}
    onClick={(e) => e.stopPropagation()}
  >
    <h2 style={{ marginBottom: "10px" }}>📊 Quick Analytics</h2>

    <p style={{ opacity: 0.8 }}>AI Insights</p>

    <div style={{ marginTop: "20px" }}>
      <p>🚀 Traffic Spike Detected</p>
      <p>📉 Risk Trend: Decreasing</p>
      <p>📈 Alerts Increased by 12%</p>
    </div>

    {/* Fake graph */}
    <div style={graphStyle}>
      📊 Mini Graph View
    </div>

    <button
  style={btn}
  onClick={() => onClose(false)}
  onMouseEnter={(e)=> e.target.style.background="#16a34a"}
  onMouseLeave={(e)=> e.target.style.background="#22c55e"}
>
  Close
</button>
  </div>

</div>


);
};

/* ---------- STYLES ---------- */

const overlayStyle = {
position: "fixed",
top: 0,
left: 0,
width: "100%",
height: "100%",
background: "rgba(0,0,0,0.6)",
backdropFilter: "blur(6px)",   // 🔥 blur effect
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex: 1000
};

const boxStyle = {
background: "#1e293b",
padding: "25px",
borderRadius: "16px",
width: "420px",
color: "white",
transform: "scale(1)",
animation: "zoomIn 0.3s ease",
boxShadow: "0 0 25px rgba(34,197,94,0.4)" // 🔥 glow
};

const graphStyle = {
marginTop: "20px",
height: "150px",
background: "#0f172a",
borderRadius: "10px",
display: "flex",
alignItems: "center",
justifyContent: "center",
color: "#aaa"
};

const btn = {
marginTop: "20px",
padding: "10px",
border: "none",
borderRadius: "8px",
background: "#22c55e",
color: "white",
cursor: "pointer",
transition: "0.3s"
};

export default AnalyticsOverlay;
