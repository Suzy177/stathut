document.addEventListener("DOMContentLoaded", () => {
  const thSelect = document.getElementById("thSelect");
  const recommendation = document.getElementById("recommendation");
  const joinBtn = document.getElementById("joinBtn");

  function showRecommendation(th) {
    let message = "";

    if (th <= 12) {
      message = `
        <strong>Recommended Clan:</strong> THE SHIELD<br>
        Best for TH10–12 relaxed farming.
      `;
    } else {
      message = `
        <strong>Recommended Clans:</strong> InvidiaBandit / VillageWarriors<br>
        Ideal for TH13+ efficient farming.
      `;
    }

    recommendation.innerHTML = message;
    recommendation.classList.remove("hidden");
    joinBtn.style.display = "inline-block";
  }

  // 🔥 Auto-load from localStorage
  const savedTH = localStorage.getItem("thLevel");
  if (savedTH) {
    thSelect.value = savedTH;
    showRecommendation(parseInt(savedTH, 10));
  }

  thSelect.addEventListener("change", () => {
    const th = parseInt(thSelect.value, 10);
    if (!isNaN(th)) {
      localStorage.setItem("thLevel", th);
      showRecommendation(th);
    }
  });
});
