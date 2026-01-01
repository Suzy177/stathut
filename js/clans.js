const data = {
  updated: "1 Jan 2026, 9:30 PM IST",
  clans: [
    { name: "Vi11ageWarriors", league: "Champions", points: 2450 },
    { name: "InvidiaBandit", league: "Masters", points: 2380 },
    { name: "THE SHIELD", league: "Masters", points: 2295 }
  ]
};

const tbody = document.getElementById("clanTable");
const lastUpdated = document.getElementById("lastUpdated");

// sort by points (desc)
data.clans.sort((a, b) => b.points - a.points);

// render
data.clans.forEach((c, i) => {
  tbody.insertAdjacentHTML(
    "beforeend",
    `<tr>
      <td>${i + 1}</td>
      <td>${c.name}</td>
      <td><span class="league ${c.league.toLowerCase()}">${c.league}</span></td>
      <td>${c.points}</td>
    </tr>`
  );
});

lastUpdated.textContent = `Last updated: ${data.updated}`;

const search = document.getElementById("clanSearch");

search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const rows = tbody.querySelectorAll("tr");

  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});
