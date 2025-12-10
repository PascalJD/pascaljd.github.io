(function () {
  const key = "pascaljd-site-mode";
  const btn = document.createElement("button");
  btn.id = "modeToggle";
  btn.type = "button";

  function apply(mode) {
    document.body.classList.toggle("atelier", mode === "atelier");
    btn.textContent = mode === "atelier" ? "Light Theme" : "Dark Theme";
    btn.setAttribute("aria-label", btn.textContent);
  }

  const stored = localStorage.getItem(key);
  const initial = stored === "atelier" ? "atelier" : "research";
  apply(initial);

  btn.addEventListener("click", function () {
    const next = document.body.classList.contains("atelier") ? "research" : "atelier";
    localStorage.setItem(key, next === "atelier" ? "atelier" : "research");
    apply(next);
  });

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(btn);
  });
})();
