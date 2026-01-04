document.addEventListener("DOMContentLoaded", () => {
  const applyButtons = document.querySelectorAll(".apply-btn");

  applyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const th = btn.dataset.th;

      // Save Town Hall
      localStorage.setItem("thLevel", th);

      // Redirect to Join page
      window.location.href = "join.html";
    });
  });
});
