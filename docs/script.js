(() => {
  const KEY = "pascaljd-site-mode";

  function apply(mode) {
    document.body.classList.toggle("atelier", mode === "atelier");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem(KEY);
    const initial = stored || "lab";
    apply(initial);

    const btn = document.createElement("button");
    btn.className = "mode-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle Research/Studio mode");
    btn.textContent = "Lab ↔ Atelier";

    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("atelier") ? "lab" : "atelier";
      apply(next);
      localStorage.setItem(KEY, next);
    });

    document.body.appendChild(btn);
  });
})();