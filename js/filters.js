document.addEventListener("DOMContentLoaded", () => {
  const thFilter = document.getElementById("thFilter");
  const clanCards = document.querySelectorAll(".clan-card");

  if (!thFilter || clanCards.length === 0) return;

  thFilter.addEventListener("change", () => {
    const selected = thFilter.value;

    clanCards.forEach(card => {
      const minTH = parseInt(card.dataset.minTh, 10);

      if (selected === "all") {
        card.style.display = "block";
        return;
      }

      if (selected === "10") {
        card.style.display = minTH === 10 ? "block" : "none";
        return;
      }

      if (selected === "13") {
        card.style.display = minTH >= 13 ? "block" : "none";
      }
    });
  });
});
