/* =========================================================
   STATHUT v3 — homepage interactions
   No libraries. Everything degrades gracefully: if this file
   fails to load, the page is still fully readable and usable.
   ========================================================= */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("sh3-js");
  var reduce = false;
  try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (e) {}
  var finePointer = false;
  try { finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches; } catch (e) {}

  // ---------- seeded random so stars/embers look the same each load ----------
  var seed = 7;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

  // ---------- stars ----------
  var starBox = document.querySelector(".sh3-stars");
  if (starBox) {
    var smallScreen = window.innerWidth < 700;
    var starCount = smallScreen ? 40 : 70;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < starCount; i++) {
      var s = document.createElement("span");
      var sz = (rnd() * 2 + 1).toFixed(1);
      s.style.cssText = "left:" + (rnd() * 100).toFixed(2) + "%;top:" + (rnd() * 60).toFixed(2) + "%;width:" + sz + "px;height:" + sz + "px;animation-duration:" + (2 + rnd() * 4).toFixed(1) + "s;animation-delay:" + (rnd() * 4).toFixed(1) + "s";
      frag.appendChild(s);
    }
    starBox.appendChild(frag);
  }

  // ---------- rising embers ----------
  var emberBox = document.querySelector(".sh3-embers");
  if (emberBox && !reduce) {
    var emberCount = window.innerWidth < 700 ? 12 : 26;
    var frag2 = document.createDocumentFragment();
    for (var j = 0; j < emberCount; j++) {
      var p = document.createElement("span");
      var es = (rnd() * 3 + 2).toFixed(1);
      var gold = rnd() > 0.35;
      p.style.cssText = "left:" + (30 + rnd() * 70).toFixed(2) + "%;bottom:" + (rnd() * 30).toFixed(1) + "%;width:" + es + "px;height:" + es + "px;background:" + (gold ? "#FFD57A" : "#8FD8FF") + ";box-shadow:0 0 10px " + (gold ? "#E8B54A" : "#4FB4FF") + ";animation-duration:" + (7 + rnd() * 8).toFixed(1) + "s;animation-delay:-" + (rnd() * 10).toFixed(1) + "s";
      frag2.appendChild(p);
    }
    emberBox.appendChild(frag2);
  }

  // ---------- entrance animation ----------
  requestAnimationFrame(function () { doc.classList.add("sh3-ready"); });

  // ---------- sticky nav background + scroll parallax ----------
  var top = document.querySelector(".sh3-top");
  var hero = document.querySelector(".sh3-hero");
  var farL = document.querySelector("[data-depth='far']");
  var midL = document.querySelector("[data-depth='mid']");
  var nearL = document.querySelector("[data-depth='near']");
  var copy = document.querySelector(".sh3-hero-copy");
  var mx = 0, my = 0, sy = 0, ticking = false;

  function paint() {
    ticking = false;
    var k = reduce ? 0 : 1;
    var heroH = hero ? hero.offsetHeight : 900;
    var prog = Math.min(1, sy / heroH); // 0 at top → 1 when hero scrolled away
    if (farL)  farL.style.transform  = "translate3d(" + (mx * -14 * k) + "px," + (my * -8 * k + prog * 80 * k) + "px,0)";
    if (midL)  midL.style.transform  = "translate3d(" + (mx * -30 * k) + "px," + (my * -18 * k + prog * 160 * k) + "px,0) scale(" + (1 + prog * 0.08 * k) + ")";
    if (nearL) nearL.style.transform = "translate3d(" + (mx * -60 * k) + "px," + (my * -34 * k + prog * 260 * k) + "px,0)";
    if (copy)  { copy.style.transform = "translate3d(0," + (prog * -60 * k) + "px,0)"; copy.style.opacity = String(1 - prog * 0.9); }
  }
  function queue() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }

  window.addEventListener("scroll", function () {
    sy = window.scrollY || window.pageYOffset;
    if (top) top.classList.toggle("scrolled", sy > 30);
    queue();
  }, { passive: true });

  if (hero && finePointer && !reduce) {
    hero.addEventListener("mousemove", function (e) {
      var r = hero.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
      queue();
    });
    hero.addEventListener("mouseleave", function () { mx = 0; my = 0; queue(); });
  }

  // ---------- pause hero animations when it's off-screen ----------
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle("paused", !entries[0].isIntersecting);
    }).observe(hero);
  }

  // ---------- scroll reveal ----------
  var reveals = document.querySelectorAll(".sh3-reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("shown"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("shown"); });
  }

  // ---------- card tilt (desktop only) ----------
  if (finePointer && !reduce) {
    document.querySelectorAll(".sh3-card").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
        card.style.setProperty("--rx", (y * -8).toFixed(2) + "deg");
      });
      card.addEventListener("mouseleave", function () {
        card.style.removeProperty("--ry");
        card.style.removeProperty("--rx");
      });
    });
  }

  // ---------- mobile menu ----------
  var burger = document.querySelector(".sh3-burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = doc.classList.toggle("sh3-menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".sh3-nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        doc.classList.remove("sh3-menu-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && doc.classList.contains("sh3-menu-open")) {
        doc.classList.remove("sh3-menu-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  // ---------- Town Hall explorer ----------
  var thImg = document.getElementById("sh3ThImg");
  var thNum = document.getElementById("sh3ThNum");
  var pills = document.querySelectorAll(".sh3-th-pill");
  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      var lvl = pill.getAttribute("data-th");
      pills.forEach(function (p) { p.setAttribute("aria-pressed", p === pill ? "true" : "false"); });
      if (!thImg) return;
      thImg.classList.add("swap");
      setTimeout(function () {
        thImg.src = "/fwa/assets/th/th" + lvl + ".png";
        thImg.alt = "Town Hall " + lvl;
        if (thNum) thNum.textContent = lvl;
        thImg.classList.remove("swap");
      }, reduce ? 0 : 200);
    });
  });
})();
