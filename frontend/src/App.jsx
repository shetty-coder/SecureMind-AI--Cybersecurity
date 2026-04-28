import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Response from "./pages/Response";
import Verification from "./pages/Verification";

import Sidebar from "./components/Sidebar";
import SearchOverlay from "./components/SearchOverlay";
import SettingsPanel from "./components/SettingsPanel";
import AnalyticsOverlay from "./components/AnalyticsOverlay";
import FilesOverlay from "./components/FilesOverlay";

function App() {
const [openSearch, setOpenSearch] = useState(false);
const [openSettings, setOpenSettings] = useState(false);
const [openAnalytics, setOpenAnalytics] = useState(false);
const [openFiles, setOpenFiles] = useState(false);

const [theme, setTheme] = useState("dark");
const [page, setPage] = useState("dashboard");

useEffect(() => {
const handler = (e) => {
if (e.key === "/") {
e.preventDefault();
setOpenSearch(true);
}
if (e.key === "Escape") {
setOpenSearch(false);
setOpenSettings(false);
setOpenAnalytics(false);
setOpenFiles(false);
}
};
window.addEventListener("keydown", handler);
return () => window.removeEventListener("keydown", handler);
}, []);

return (
<div style={{
display: "flex",
background: theme === "dark" ? "#0f172a" : "#f1f5f9",
minHeight: "100vh",
color: theme === "dark" ? "white" : "black"
}}>

```
  <Sidebar
    onSearchClick={() => setOpenSearch(true)}
    onSettingsClick={() => setOpenSettings(true)}
    onAnalyticsClick={() => setOpenAnalytics(true)}
    onFilesClick={() => setOpenFiles(true)}
    setPage={setPage}
  />

  {/* Pages */}
  {page === "dashboard" && <Dashboard theme={theme} setPage={setPage} />}
  {page === "analytics" && <Analytics theme={theme} />}
  {page === "alerts" && <Alerts theme={theme} />}
  {page === "response" && <Response theme={theme} />}
  {page === "verification" && <Verification theme={theme} />}

  {/* Overlays */}
  <SearchOverlay open={openSearch} onClose={setOpenSearch} />
  <AnalyticsOverlay open={openAnalytics} onClose={setOpenAnalytics} />
  <FilesOverlay open={openFiles} onClose={setOpenFiles} />

  <SettingsPanel
    open={openSettings}
    onClose={setOpenSettings}
    setTheme={setTheme}
  />

</div>

);
}

export default App;
