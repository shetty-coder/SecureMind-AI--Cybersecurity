# =========================
# backend/services/risk_score.py
# =========================
def calculate_risk(prediction):
    if prediction == "Attack Detected":
        return 95
    return 10