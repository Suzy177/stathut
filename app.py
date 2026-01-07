from flask import Flask, jsonify, render_template
import requests

app = Flask(__name__)

API_TOKEN = "PASTE_YOUR_CLASH_API_TOKEN_HERE"

CLANS = [
    "PGPPQRLY",
    "9VG8P90Q",
    "LL2C8L8V"
]

HEADERS = {
    "Authorization": f"Bearer {API_TOKEN}"
}

@app.route("/")
def home():
    return "StatHut backend running"

@app.route("/fwa-war-status")
def fwa_war_status_page():
    return render_template("fwa-war-status.html")

@app.route("/api/fwa/wars")
def fwa_wars():
    results = []

    for tag in CLANS:
        url = f"https://api.clashofclans.com/v1/clans/%23{tag}/currentwar"
        war = requests.get(url, headers=HEADERS).json()

        if war.get("state") == "notInWar":
            clan = war.get("clan", {})
            results.append({
                "clan": clan.get("name", "Unknown"),
                "tag": f"#{tag}",
                "status": "neutral",
                "resultText": "Not in war or private log",
                "badge": clan.get("badgeUrls", {}).get("medium", "")
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

if __name__ == "__main__":
    app.run(debug=True)
