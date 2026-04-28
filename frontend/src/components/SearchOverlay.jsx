import React, { useEffect, useState } from "react";

const mockData = [
{ ip: "192.168.1.1", type: "DoS Attack", risk: "High" },
{ ip: "10.0.0.2", type: "Brute Force", risk: "Medium" },
{ ip: "172.16.0.5", type: "Suspicious Login", risk: "Low" }
];

const SearchOverlay = ({ open, onClose }) => {
const [query, setQuery] = useState("");
const [results, setResults] = useState([]);

useEffect(() => {
const handleKey = (e) => {
if (e.key === "/") {
e.preventDefault();
onClose(false); // ensure open handled outside
}
if (e.key === "Escape") onClose(false);
};
window.addEventListener("keydown", handleKey);
return () => window.removeEventListener("keydown", handleKey);
}, [onClose]);

useEffect(() => {
const filtered = mockData.filter(item =>
item.ip.includes(query) ||
item.type.toLowerCase().includes(query.toLowerCase()) ||
item.risk.toLowerCase().includes(query.toLowerCase())
);
setResults(filtered);
}, [query]);

if (!open) return null;

return (
<div style={overlayStyle} onClick={() => onClose(false)}>
<div style={boxStyle} onClick={(e) => e.stopPropagation()}>

```
    <input
      autoFocus
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search threats, IP, attack type..."
      style={inputStyle}
    />

    <div style={{ marginTop: "10px" }}>
      {query === "" && (
        <div style={{ color: "#888" }}>Try: "DoS", "IP", "High risk"</div>
      )}

      {results.map((r, i) => (
        <div key={i} style={resultStyle}>
          <strong>{r.type}</strong> — {r.ip} ({r.risk})
        </div>
      ))}
    </div>

  </div>
</div>


);
};

const overlayStyle = {
position: "fixed",
top: 0,
left: 0,
width: "100%",
height: "100%",
background: "rgba(0,0,0,0.7)",
display: "flex",
justifyContent: "center",
alignItems: "center",
zIndex: 1000,
animation: "fadeIn 0.3s"
};

const boxStyle = {
background: "#1e293b",
padding: "20px",
borderRadius: "12px",
width: "400px",
boxShadow: "0 0 25px rgba(34,197,94,0.5)",
animation: "scaleIn 0.3s"
};

const inputStyle = {
width: "100%",
padding: "10px",
borderRadius: "6px",
border: "none",
outline: "none",
background: "#0f172a",
color: "white"
};

const resultStyle = {
padding: "8px",
borderRadius: "6px",
cursor: "pointer",
transition: "0.2s"
};

export default SearchOverlay;
