from flask import Blueprint, jsonify
import pandas as pd

detect_bp = Blueprint("detect", __name__)

# ✅ Corrected the path to access the ml folder from the backend
import os
base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
csv_path = os.path.join(base_dir, "frontend", "ml", "creditcard.csv")
df = pd.read_csv(csv_path)

@detect_bp.route("/detect", methods=["GET"])
def detect():
    sample = df.sample(4)

    data = []

    for _, row in sample.iterrows():
        result = "Attack Detected" if row["Class"] == 1 else "Normal Traffic"

        data.append({
            "src_bytes": round(row["Amount"], 2),
            "result": result
        })

    return jsonify(data)