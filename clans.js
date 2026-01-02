document.addEventListener("DOMContentLoaded", () => {

  const DATA_SOURCE = getClanData();

  renderTable(DATA_SOURCE);

  function getClanData() {
    // 🔁 FUTURE: replace this with fetch("/api/clans")
    return {
      updated: "1 Jan 2026, 9:30 PM IST",
      clans: [
        { name: "Vi11ageWarriors", league: "Champions", points: 2450 },
        { name: "InvidiaBandit", league: "Masters", points: 2380 },
        { name: "THE SHIELD", league: "Masters", points: 2295 }
      ]
    };
  }

  function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, "");
  }

  function renderTable(data) {
    const tbody = document.getElementById("clanTable");
    const lastUpdated = document.getElementById("lastUpdated");
    if (!tbody) return;

    data.clans
      .sort((a, b) => b.points - a.points)
      .forEach((c, i) => {
        const slug = slugify(c.name);

        tbody.insertAdjacentHTML(
          "beforeend",
          `<tr>
            <td>${i + 1}</td>
            <td>
              <a href="clans/${slug}.html" class="clan-link">
                ${c.name}
              </a>
            </td>
            <td><span class="league ${c.league.toLowerCase()}">${c.league}</span></td>
            <td>${c.points}</td>
          </tr>`
        );
      });

    if (lastUpdated) {
      lastUpdated.textContent = `Last updated: ${data.updated}`;
    }
  }

});
