from flask import Flask, jsonify, render_template
import requests
import os

app = Flask(__name__)

# ==============================
# CONFIG
# ==============================

API_TOKEN = os.getenv("API_TOKEN")

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}"
}

# ✅ ONLY THESE CLANS WILL APPEAR
CLANS = [
    "PGPPQRLY",  # THE SHIELD
    "9VG8P90Q",  # InvidiaBandit
    "LL2C8L8V"   # Vi11ageWarriors
]

# ==============================
# ROUTES
# ==============================

@app.route("/")
def home():
    return "StatHut FWA backend is running."

@app.route("/fwa-war-status")
def fwa_war_status_page():
    return render_template("fwa-war-status.html")

@app.route("/api/fwa/wars")
def fwa_wars():
    results = []

    for tag in CLANS:
        url = f"https://api.clashofclans.com/v1/clans/%23{tag}/currentwar"
        response = requests.get(url, headers=HEADERS)

        # If Clash API fails
        if response.status_code != 200:
            results.append({
                "clan": "Unknown",
                "tag": f"#{tag}",
                "status": "neutral",
                "resultText": "Unable to fetch war data",
                "badge": ""
            })
            continue

        war = response.json()

        # Safety check (prevents KeyError)
        if "state" not in war:
            results.append({
                "clan": "Unknown",
                "tag": f"#{tag}",
                "status": "neutral",
                "resultText": "Invalid war data",
                "badge": ""
            })
            continue

        # Not in war / private log
        if war["state"] == "notInWar":
            results.append({
                "clan": "Unknown",
                "tag": f"#{tag}",
                "status": "neutral",
                "resultText": "Not in war or private log",
                "badge": ""
            })
            continue

        # Safe to access now
        clan = war["clan"]
        opponent = war["opponent"]

        # Decide result
        if war["state"] == "warEnded":
            if clan["stars"] > opponent["stars"]:
                status = "victory"
                result = "War Ended – Victory"
            elif clan["stars"] < opponent["stars"]:
                status = "defeat"
                result = "War Ended – Defeat"
            else:
                status = "tie"
                result = "War Ended – Tie"
        else:
            status = "tie"
            result = "War In Progress"

        results.append({
            "clan": clan["name"],
            "tag": f"#{tag}",
            "opponent": opponent["name"],
            "status": status,
            "resultText": result,
            "stars": f"{clan['stars']} – {opponent['stars']}",
            "destruction": f"{clan['destructionPercentage']}% – {opponent['destructionPercentage']}%",
            "footer": f"{war['teamSize']}v{war['teamSize']} | State: {war['state']}",
            "badge": clan["badgeUrls"]["medium"]
        })

    return jsonify(results)

# ==============================
# LOCAL DEV ONLY
# ==============================

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
