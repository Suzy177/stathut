function applyFilters() {
  const selectedTH = thFilter.value;
  const selectedStatus = statusFilter.value;
  let visibleCount = 0;

  clanCards.forEach(card => {
    const cardTHs = card.dataset.th.split(",");
    const cardStatus = card.dataset.status;

    const thMatch = selectedTH === "all" || cardTHs.includes(selectedTH);
    const statusMatch = selectedStatus === "all" || cardStatus === selectedStatus;

    if (thMatch && statusMatch) {
      card.style.display = "block";
      visibleCount++;
    } else {
      card.style.display = "none";
    }
  });

  document.getElementById("no-results").style.display =
    visibleCount === 0 ? "block" : "none";
}
