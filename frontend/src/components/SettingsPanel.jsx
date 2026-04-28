import React from "react";

const SettingsPanel = ({ open, onClose, setTheme }) => {
return (
<div style={{
position: "fixed",
top: 0,
right: open ? "0px" : "-300px",
width: "300px",
height: "100%",
background: "#1e293b",
color: "white",
transition: "0.3s",
zIndex: 1000
}}>

```
  <div style={{ padding: "20px" }}>
    <h2>⚙️ Settings</h2>

    <button onClick={() => onClose(false)}>Close</button>

    <div style={{ marginTop: "20px" }}>
      <p>Theme:</p>

      <button 
        onClick={() => setTheme("dark")}
        style={{ marginRight: "10px" }}
      >
        Dark
      </button>

      <button 
        onClick={() => setTheme("light")}
      >
        Light
      </button>

    </div>
  </div>
</div>


);
};

export default SettingsPanel;
