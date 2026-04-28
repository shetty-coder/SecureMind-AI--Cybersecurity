from flask import Blueprint, request, jsonify, current_app
from flask_mail import Message
import random
import re

otp_bp = Blueprint("otp", __name__)

# Store OTPs temporarily
otp_store = {}

# ONLY THESE USERS CAN GET OTP
allowed_users = [
    "tharunyadavts@gmail.com"
]

# ---------------- EMAIL VALIDATION ----------------
def is_valid_email(email):
    pattern = r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'

    if not re.match(pattern, email):
        return False

    allowed_domains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com"
    ]

    domain = email.split("@")[1].lower()

    return domain in allowed_domains


# ---------------- SEND OTP ----------------
@otp_bp.route("/send-otp", methods=["POST"])
def send_otp():
    try:
        email = request.json.get("email", "").strip().lower()

        if not email:
            return jsonify({
                "success": False,
                "error": "Email required"
            }), 400

        # Check valid email format
        if not is_valid_email(email):
            return jsonify({
                "success": False,
                "error": "Invalid or unsupported email"
            }), 400

        # CHECK REGISTERED USER
        if email not in allowed_users:
            return jsonify({
                "success": False,
                "error": "User not registered"
            }), 403

        print("➡ Sending OTP to:", email)

        otp = str(random.randint(100000, 999999))
        otp_store[email] = otp

        msg = Message(
            "Your OTP Code",
            sender=current_app.config["MAIL_USERNAME"],
            recipients=[email]
        )

        msg.body = f"Your OTP is {otp}"

        current_app.extensions["mail"].send(msg)

        print("✅ OTP SENT SUCCESSFULLY:", otp)

        return jsonify({
            "success": True,
            "message": "OTP sent"
        })

    except Exception as e:
        print("❌ ERROR SENDING MAIL:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


# ---------------- VERIFY OTP ----------------
@otp_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    try:
        data = request.json

        email = data.get("email", "").strip().lower()
        entered_otp = data.get("otp", "").strip()

        if not email or not entered_otp:
            return jsonify({
                "success": False,
                "message": "Email and OTP required"
            }), 400

        real_otp = otp_store.get(email)

        if real_otp == entered_otp:
            otp_store.pop(email, None)

            return jsonify({
                "success": True,
                "message": "OTP verified"
            })

        return jsonify({
            "success": False,
            "message": "Invalid OTP"
        })

    except Exception as e:
        print("❌ VERIFY ERROR:", e)

        return jsonify({
            "success": False,
            "error": str(e)
        }), 500