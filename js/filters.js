const thFilter = document.getElementById("filter-th");
const statusFilter = document.getElementById("filter-status");
const clanCards = document.querySelectorAll(".clan-card");

function applyFilters() {
  const selectedTH = thFilter.value;
  const selectedStatus = statusFilter.value;

  clanCards.forEach(card => {
    const cardTHs = card.dataset.th.split(",");
    const cardStatus = card.dataset.status;

    let thMatch = selectedTH === "all" || cardTHs.includes(selectedTH);
    let statusMatch = selectedStatus === "all" || cardStatus === selectedStatus;

    if (thMatch && statusMatch) {
      card.style.display = "block";
      card.style.opacity = "1";
      card.style.transform = "scale(1)";
    } else {
      card.style.display = "none";
    }
  });
}

thFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);
