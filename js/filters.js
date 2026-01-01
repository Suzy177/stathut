function applyFilters() {
  const selectedTH = thFilter.value;
  const selectedStatus = statusFilter.value;
  let visible = 0;

  clanCards.forEach(card => {
    const cardTHs = card.dataset.th.split(",");
    const cardStatus = card.dataset.status;

    let thMatch = false;

    // TH13–TH18 always allowed everywhere
    if (selectedTH === "all") {
      thMatch = true;
    }
    else if (parseInt(selectedTH) >= 13 && parseInt(selectedTH) <= 18) {
      thMatch = true;
    }
    else {
      // Below TH13 → strict matching
      thMatch = cardTHs.includes(selectedTH);
    }

    // Status filter is OPTIONAL (informational)
    const statusMatch =
      selectedStatus === "all" || cardStatus === selectedStatus;

    if (thMatch && statusMatch) {
      card.style.display = "block";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  const msg = document.getElementById("no-results");
  if (msg) msg.style.display = visible === 0 ? "block" : "none";
}
