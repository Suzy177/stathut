document.addEventListener("DOMContentLoaded", () => {
  const thFilter = document.getElementById("thFilter");
  const clanCards = document.querySelectorAll(".clan-card");

  if (!thFilter || clanCards.length === 0) return;

  thFilter.addEventListener("change", () => {
    const selectedTH = thFilter.value;

    clanCards.forEach(card => {
      const allowedTHs = card.dataset.th.split(",");

      if (
        selectedTH === "all" ||
        (selectedTH === "13" && allowedTHs.includes("13")) ||
        allowedTHs.includes(selectedTH)
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
