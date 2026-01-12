from flask import Flask, jsonify, render_template
import requests
import os

app = Flask(__name__)

API_TOKEN = os.getenv("API_TOKEN")

CLANS = [
    "PGPPQRLY",  # THE SHIELD
    "9VG8P90Q",  # InvidiaBandit
    "LL2C8L8V",  # Vi11ageWarriors
]

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}"
}

@app.route("/fwa-war-status")
def fwa_page():
    return render_template("fwa-war-status.html")

@app.route("/api/fwa/wars")
def fwa_wars():
    results = []

    for tag in CLANS:
        url = f"https://api.clashofclans.com/v1/clans/%23{tag}/currentwar"
        response = requests.get(url, headers=HEADERS)

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

        # 🛑 Handle non-war responses safely
        if "clan" not in war or "opponent" not in war:
            results.append({
                "clan": "Unknown",
                "tag": f"#{tag}",
                "status": "neutral",
                "resultText": war.get("reason", "Not in war or private log"),
                "badge": ""
            })
            continue

        clan = war["clan"]
        opp = war["opponent"]

        if war["state"] == "warEnded":
            if clan["stars"] > opp["stars"]:
                status = "victory"
                result = "War Ended – Victory"
            elif clan["stars"] < opp["stars"]:
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
            "opponent": opp["name"],
            "status": status,
            "resultText": result,
            "stars": f"{clan['stars']} – {opp['stars']}",
            "destruction": f"{clan['destructionPercentage']}% – {opp['destructionPercentage']}%",
            "footer": f"{war['teamSize']}v{war['teamSize']} | State: {war['state']}",
            "badge": clan["badgeUrls"]["medium"]
        })

    return jsonify(results)

@app.route("/")
def home():
    return "StatHut API running"
