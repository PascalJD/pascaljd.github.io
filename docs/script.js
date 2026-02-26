(() => {
  const KEY = "pascaljd-site-mode";
  const MAX_PUPIL_OFFSET = 4.5;
  const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PIGEON_MESSAGE = "P=NP";

  function apply(mode) {
    document.body.classList.toggle("atelier", mode === "atelier");
  }

  function initModeToggle() {
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
  }

  function updatePupil(eye, clientX, clientY) {
    const pupil = eye.querySelector(".pupil");
    if (!pupil) return;

    const rect = eye.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = clientX - cx;
    const dy = clientY - cy;
    const dist = Math.hypot(dx, dy) || 1;
    const scale = Math.min(MAX_PUPIL_OFFSET, dist) / dist;

    pupil.style.transform = `translate(${(dx * scale).toFixed(2)}px, ${(dy * scale).toFixed(2)}px)`;
  }

  function resetPupil(eye) {
    const pupil = eye.querySelector(".pupil");
    if (!pupil) return;
    pupil.style.transform = "translate(0, 0)";
  }

  function initPigeon() {
    const pigeon = document.createElement("div");
    pigeon.id = "cursorPigeon";
    pigeon.className = "cursor-pigeon";
    pigeon.setAttribute("role", "button");
    pigeon.setAttribute("tabindex", "0");
    pigeon.setAttribute("aria-label", "Click pigeon");
    pigeon.innerHTML = `
      <div class="pigeon-bob">
        <span class="pigeon-quote" role="status" aria-live="polite"></span>
        <div class="pigeon-head">
          <span class="pigeon-eye left"><span class="pupil"></span></span>
          <span class="pigeon-eye right"><span class="pupil"></span></span>
          <span class="pigeon-beak"></span>
        </div>
        <div class="pigeon-body"><span class="pigeon-wing"></span></div>
        <span class="pigeon-feet"></span>
      </div>
    `;
    document.body.appendChild(pigeon);

    const quote = pigeon.querySelector(".pigeon-quote");
    let quoteTimer = 0;

    const showQuote = () => {
      if (!quote) return;
      quote.textContent = PIGEON_MESSAGE;
      pigeon.classList.add("show-quote");
      window.clearTimeout(quoteTimer);
      quoteTimer = window.setTimeout(() => {
        pigeon.classList.remove("show-quote");
      }, 1700);
    };

    pigeon.addEventListener("click", showQuote, { passive: true });
    pigeon.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      showQuote();
    });

    const eyes = Array.from(pigeon.querySelectorAll(".pigeon-eye"));
    if (!eyes.length || REDUCED_MOTION) return;

    const onMove = (clientX, clientY) => {
      for (const eye of eyes) {
        updatePupil(eye, clientX, clientY);
      }
    };

    window.addEventListener(
      "pointermove",
      (event) => onMove(event.clientX, event.clientY),
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      (event) => {
        const touch = event.touches && event.touches[0];
        if (!touch) return;
        onMove(touch.clientX, touch.clientY);
      },
      { passive: true }
    );

    document.addEventListener(
      "mouseleave",
      () => {
        for (const eye of eyes) resetPupil(eye);
      },
      { passive: true }
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem(KEY);
    apply(stored || "lab");
    initModeToggle();
    initPigeon();
  });
})();
