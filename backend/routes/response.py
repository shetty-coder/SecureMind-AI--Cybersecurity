# =========================
# backend/routes/response.py
# =========================
from flask import Blueprint, request, jsonify

response_bp = Blueprint("response", __name__)

@response_bp.route("/respond", methods=["POST"])
def respond():
    data = request.json
    action = data.get("action")

    if action == "block_ip":
        return jsonify({"message": "IP blocked successfully"})
    
    elif action == "lock_account":
        return jsonify({"message": "Account locked successfully"})
    
    return jsonify({"message": "No action taken"})