import React from "react";

const Sidebar = ({ onSearchClick, onSettingsClick, onAnalyticsClick, onFilesClick, setPage }) => {
return (
<div style={{
width: "70px",
height: "100vh",
background: "#111827",
display: "flex",
flexDirection: "column",
alignItems: "center",
paddingTop: "20px"
}}>

```
  <div style={iconStyle} onClick={() => setPage("dashboard")}>☰</div>
  <div style={iconStyle} onClick={onSearchClick}>🔍</div>

  <div style={iconStyle} onClick={onAnalyticsClick}>📊</div>

  <div style={iconStyle} onClick={() => setPage("response")}>⚡</div>

  <div style={iconStyle} onClick={onFilesClick}>📁</div>

  <div style={iconStyle} onClick={onSettingsClick}>⚙️</div>

</div>


);
};

const iconStyle = {
color: "white",
fontSize: "20px",
margin: "20px 0",
cursor: "pointer"
};

export default Sidebar;
