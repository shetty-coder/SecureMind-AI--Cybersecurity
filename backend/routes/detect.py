from flask import Blueprint, jsonify
import pandas as pd
import os
import random

detect_bp = Blueprint("detect", __name__)

# CSV path
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
csv_path = os.path.join(base_dir, "frontend", "ml", "creditcard.csv")

df = pd.read_csv(csv_path)

@detect_bp.route("/detect", methods=["GET"])
def detect():
    sample = df.sample(4)

    data = []

    for _, row in sample.iterrows():
        attack = row["Class"] == 1

        result = "Attack Detected" if attack else "Normal Traffic"

        data.append({
            "amount": float(round(row["Amount"], 2)),
            "result": result,

            # Fake attacker data for demo
            "src_ip": f"192.168.1.{random.randint(2,254)}",
            "target_ip": "10.0.0.5",
            "device": random.choice(["Windows PC", "Linux Server", "Android Phone"]),
            "location": random.choice(["Bengaluru", "Mumbai", "Delhi", "Chennai"]),
            "threat": random.randint(70, 99) if attack else random.randint(1, 20)
        })

    return jsonify(data)