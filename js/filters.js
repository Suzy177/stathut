document.addEventListener("DOMContentLoaded", () => {
  const filter = document.getElementById("thFilter");
  const cards = document.querySelectorAll(".clan-card");

  if (!filter || cards.length === 0) return;

  filter.addEventListener("change", () => {
    const value = filter.value;

    cards.forEach(card => {
      const minTH = parseInt(card.dataset.minTh, 10);

      // Show all
      if (value === "all") {
        card.style.display = "flex";
        return;
      }

      // TH10–12
      if (value === "10") {
        card.style.display =
          minTH === 10 ? "flex" : "none";
        return;
      }

      // TH13+
      if (value === "13") {
        card.style.display =
          minTH >= 13 ? "flex" : "none";
      }
    });
  });
});
