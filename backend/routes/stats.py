from flask import Blueprint, jsonify
import random

stats_bp = Blueprint("stats", __name__)

@stats_bp.route("/stats")
def get_stats():
    data = {
        "engaged_sessions": random.randint(1000, 2000),
        "engagement_rate": round(random.uniform(20, 50), 2),
        "sessions": random.randint(500, 1000),
        "events": round(random.uniform(10, 50), 2),
        "active_users": random.randint(800, 1200),
        "avg_time": "00:00:21",
        "new_users": random.randint(700, 1000),
        "conversions": random.randint(800, 1200)
    }
    return jsonify(data)