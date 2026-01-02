document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     DATA SOURCE (Option A – Manual)
     =============================== */
  function getClanData() {
    // 🔁 FUTURE: replace with fetch("/api/clans")
    return {
      updated: "1 Jan 2026, 9:30 PM IST",
      clans: [
        { name: "Vi11ageWarriors", league: "Champions", points: 2450 },
        { name: "InvidiaBandit", league: "Masters", points: 2380 },
        { name: "THE SHIELD", league: "Masters", points: 2295 }
      ]
    };
  }

  const DATA_SOURCE = getClanData();

  /* ===============================
     HELPERS
     =============================== */
  function slugify(name) {
    return name.toLowerCase().replace(/\s+/g, "");
  }

  /* ===============================
     RENDER TABLE
     =============================== */
  function renderTable(data) {
    const tbody = document.getElementById("clanTable");
    const lastUpdated = document.getElementById("lastUpdated");

    if (!tbody) return;

    tbody.innerHTML = "";

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
            <td>
              <span class="league ${c.league.toLowerCase()}">
                ${c.league}
              </span>
            </td>
            <td>${c.points}</td>
          </tr>`
        );
      });

    if (lastUpdated) {
      lastUpdated.textContent = `Last updated: ${data.updated}`;
    }
  }

  /* ===============================
     INITIAL LOAD
     =============================== */
  renderTable(DATA_SOURCE);

  /* ===============================
     SEARCH FILTER (optional)
     =============================== */
  const searchInput = document.getElementById("clanSearch");

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const value = searchInput.value.toLowerCase();

      const filtered = {
        ...DATA_SOURCE,
        clans: DATA_SOURCE.clans.filter(clan =>
          clan.name.toLowerCase().includes(value) ||
          clan.league.toLowerCase().includes(value)
        )
      };

      renderTable(filtered);
    });
  }

  /* ===============================
     HOW POINTS WORK MODAL
     =============================== */
  const openBtn = document.getElementById("openPointsInfo");
  const closeBtn = document.getElementById("closePointsInfo");
  const modal = document.getElementById("pointsModal");

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

});
