document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DATA SOURCE (Option A - Manual)
     =============================== */
  const data = {
    updated: "1 Jan 2026, 9:30 PM IST",
    clans: [
      { name: "Vi11ageWarriors", league: "Champions", points: 2450 },
      { name: "InvidiaBandit", league: "Masters", points: 2380 },
      { name: "THE SHIELD", league: "Masters", points: 2295 }
    ]
  };

  /* ===============================
     ELEMENT REFERENCES
     =============================== */
  const tbody = document.getElementById("clanTable");
  const lastUpdated = document.getElementById("lastUpdated");
  const searchInput = document.getElementById("clanSearch");

  if (!tbody) return; // safety guard

  /* ===============================
     HELPERS
     =============================== */
  function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, "");
  }

  /* ===============================
     RENDER TABLE
     =============================== */
  function renderTable(clans) {
    tbody.innerHTML = "";

    clans
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
            <td>
              <span class="league ${c.league.toLowerCase()}">
                ${c.league}
              </span>
            </td>
            <td>${c.points}</td>
          </tr>`
        );
      });
  }

  /* ===============================
     INITIAL RENDER
     =============================== */
  renderTable(data.clans);

  if (lastUpdated) {
    lastUpdated.textContent = `Last updated: ${data.updated}`;
  }

  /* ===============================
     SEARCH FILTER
     =============================== */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const filtered = data.clans.filter(clan =>
        clan.name.toLowerCase().includes(value) ||
        clan.league.toLowerCase().includes(value)
      );

      renderTable(filtered);
    });
  }

});
