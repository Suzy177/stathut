document.addEventListener("DOMContentLoaded", () => {
  const thSelect = document.getElementById("thSelect");
  const recommendation = document.getElementById("recommendation");
  const joinBtn = document.getElementById("joinBtn");

  thSelect.addEventListener("change", () => {
    const th = parseInt(thSelect.value, 10);

    if (isNaN(th)) {
      recommendation.classList.add("hidden");
      joinBtn.style.display = "none";
      return;
    }

    let message = "";

    if (th <= 12) {
      message = `
        <strong>Recommended Clan:</strong> THE SHIELD<br>
        Best for TH10–12 players focused on upgrades and relaxed farming.
      `;
    } else {
      message = `
        <strong>Recommended Clans:</strong> InvidiaBandit / VillageWarriors<br>
        Ideal for TH13+ players focused on efficient farming and progression.
      `;
    }

    recommendation.innerHTML = message;
    recommendation.classList.remove("hidden");
    joinBtn.style.display = "inline-block";
  });
});
