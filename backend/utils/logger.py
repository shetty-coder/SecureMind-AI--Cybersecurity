# =========================
# backend/utils/logger.py
# =========================
from datetime import datetime

def log_event(message):
    with open("system.log", "a") as file:
        file.write(f"{datetime.now()} - {message}\n")