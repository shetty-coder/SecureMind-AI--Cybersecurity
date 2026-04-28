import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode> <App />
</React.StrictMode>
);

const iconStyle = {
  color: "white",
  fontSize: "20px",
  margin: "20px 0",
  cursor: "pointer",
  transition: "0.3s"
};