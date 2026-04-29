#  AI Intrusion Detection Dashboard

An intelligent real-time cybersecurity dashboard that detects suspicious activity using Machine Learning and visualizes global attack patterns on an interactive map.

---

##  Overview

This project is designed to monitor, detect, and visualize potential cyber threats in real time.
It combines **Machine Learning + Web Analytics + Geolocation Mapping** to provide a complete intrusion detection system.

---

### Key Features

###  AI-Based Threat Detection

* Uses trained ML model to classify transactions
* Detects **Attack vs Normal Traffic**
* Provides real-time predictions

###  Real-Time Analytics Dashboard

* Live sessions updating every 2 seconds
* Traffic split visualization (Pie chart)
* Stats:

  * Total Sessions
  * Attacks
  * Normal Traffic
  * Average Amount

### 🔄 Smart User Recovery System (🔥 UNIQUE FEATURE)

* If a real user is wrongly flagged:

  * Press **Ctrl + Shift + R**
  * Complete CAPTCHA verification
  * Restore access securely
* Prevents false positives from blocking legitimate users

###  Live Connection Status

* Shows backend connectivity (Connected / Disconnected)
* Helps monitor system health instantly

---

##  Tech Stack

### Frontend

* React.js (Vite)
* Chart.js
* React-Leaflet (Maps)

### Backend

* Flask (Python)
* REST API

### Machine Learning

* LightGBM Model
* SHAP (Explainability)

### Data

* Credit Card Fraud Dataset

---

##  Project Structure

```
AI-INTRUSION/
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## ⚙️ How to Run

### 🔹 Backend

```
cd backend
pip install -r requirements.txt
python app.py
```

Runs on: `http://127.0.0.1:5000`

---

### 🔹 Frontend

```
cd frontend
npm install
npm run dev
```

Runs on: `http://localhost:5173`

---

##  API Endpoints

| Endpoint         | Method | Description               |
| ---------------- | ------ | ------------------------- |
| `/api/demo-data` | GET    | Get simulated attack data |
| `/api/detect`    | POST   | Run ML prediction         |

---

##  Use Cases

* Cybersecurity monitoring dashboards
* Fraud detection systems
* Real-time threat intelligence
* Network intrusion detection

---

##  Future Enhancements

* Live WebSocket streaming
* Real IP tracking (GeoIP integration)
* Alert notifications (Email/SMS)
* Admin control panel
* Attack heatmap visualization


This project stands out by combining:

* AI-powered detection
* Real-time visualization
* Interactive global attack mapping
* Smart user recovery mechanism


