const data = {
  updated: "1 Jan 2026, 9:30 PM IST",
  clans: [
    { rank: 1, name: "Vi11ageWarriors", league: "Champions", points: 2450 },
    { rank: 2, name: "InvidiaBandit", league: "Masters", points: 2380 },
    { rank: 3, name: "THE SHIELD", league: "Masters", points: 2295 }
  ]
};

const tbody = document.getElementById("clanTable");
const lastUpdated = document.getElementById("lastUpdated");

if (tbody) {
  data.clans.forEach(c => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td>${c.rank}</td>
        <td>${c.name}</td>
        <td>${c.league}</td>
        <td>${c.points}</td>
      </tr>`
    );
  });
}

if (lastUpdated) {
  lastUpdated.textContent = `Last updated: ${data.updated}`;
}
