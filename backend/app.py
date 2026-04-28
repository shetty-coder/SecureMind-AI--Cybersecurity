from flask import Flask, jsonify
from flask_cors import CORS
from flask_mail import Mail
from scapy.all import sniff, IP, get_if_list
import threading
import random

from routes.detect import detect_bp
from routes.response import response_bp
from routes.stats import stats_bp
from routes.otp import otp_bp   # pyright: ignore[reportMissingImports]

app = Flask(__name__)

# ---------------- MAIL CONFIG ----------------
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'tharunyadavts@gmail.com'
app.config['MAIL_PASSWORD'] = 'rggd vors uxfo nkdh'
app.config['MAIL_DEFAULT_SENDER'] = 'tharunyadavts@gmail.com'

mail = Mail(app)
CORS(app)

# ---------------- REGISTER ROUTES ----------------
app.register_blueprint(detect_bp, url_prefix="/api")
app.register_blueprint(response_bp, url_prefix="/api")
app.register_blueprint(stats_bp, url_prefix="/api")
app.register_blueprint(otp_bp, url_prefix="/api")

# ---------------- LIVE NETWORK MONITOR ----------------
network_stats = {
    "packets": 0,
    "unique_ips": set(),
    "alerts": [],
    "recent_attacks": []
}

def packet_callback(packet):
    print("Packet captured!")   # ✅ DEBUG LINE

    network_stats["packets"] += 1

    if packet.haslayer(IP):
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst

        network_stats["unique_ips"].add(src_ip)

        # Alert after traffic increase
        if network_stats["packets"] > 100:
            if len(network_stats["alerts"]) < 5:
                network_stats["alerts"].append("⚠ High Traffic Detected")

        # Random suspicious traffic simulation
        if random.randint(1, 10) > 7:
            attack = {
                "src_ip": src_ip,
                "target_ip": dst_ip,
                "device": random.choice([
                    "Linux Server",
                    "Windows PC",
                    "Android Phone",
                    "Unknown Bot"
                ]),
                "location": random.choice([
                    "Bengaluru",
                    "Mumbai",
                    "Delhi",
                    "Russia",
                    "China",
                    "Unknown VPN"
                ]),
                "threat": random.randint(80, 99)
            }

            network_stats["recent_attacks"].append(attack)

            if len(network_stats["recent_attacks"]) > 5:
                network_stats["recent_attacks"].pop(0)

# ---------------- FIXED SNIFFING ----------------
def start_sniffing():
    try:
        interfaces = get_if_list()
        print("Available interfaces:", interfaces)

        iface = None

        # Flexible matching (fix for Windows naming issues)
        for i in interfaces:
            if "Wi" in i or "Eth" in i:
                iface = i
                break

        # fallback if nothing matched
        if not iface:
            print("⚠ No Wi-Fi/Ethernet found, using default")
            sniff(prn=packet_callback, store=False)
            return

        print("Using interface:", iface)

        sniff(
            iface=iface,
            prn=packet_callback,
            store=False
        )

    except Exception as e:
        print("Sniff Error:", e)
        print("⚠ Falling back to default sniffing...")

        # FINAL fallback (always works)
        sniff(prn=packet_callback, store=False)

# Run packet sniffing in background
threading.Thread(target=start_sniffing, daemon=True).start()

# ---------------- LIVE STATS API ----------------
@app.route("/api/live-stats")
def live_stats():
    return jsonify({
        "packets": network_stats["packets"],
        "unique_ips": len(network_stats["unique_ips"]),
        "alerts": network_stats["alerts"][-5:],
        "recent_attacks": network_stats["recent_attacks"][-5:]
    })

# ---------------- HOME ----------------
@app.route("/")
def home():
    return """
    <h1>AI Intrusion Detection Backend Running 🚀</h1>
    <p>Available APIs:</p>
    <ul>
        <li>/api/detect</li>
        <li>/api/respond</li>
        <li>/api/live-stats</li>
    </ul>
    """

# ---------------- RUN APP ----------------
if __name__ == "__main__":
    app.run(debug=True)