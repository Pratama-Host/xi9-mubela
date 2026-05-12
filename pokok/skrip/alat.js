/* ================================================================
   pokok/skrip/alat.js — TKJ XI-9 | Utilities & Helper Functions
   ================================================================ */

/* URL VALIDATOR */
export const URLValidator = {
  isSafe(url) {
    if (
      !url ||
      typeof url !== "string"
    )
      return false;
    const trimmed = url.trim();
    if (
      trimmed
        .toLowerCase()
        .startsWith(
          "javascript:",
        ) ||
      trimmed
        .toLowerCase()
        .startsWith("data:")
    )
      return false;
    if (
      trimmed.startsWith(".") ||
      trimmed.startsWith("/")
    )
      return true;
    try {
      const parsed = new URL(
        trimmed,
      );
      return [
        "http:",
        "https:",
      ].includes(parsed.protocol);
    } catch {
      return !trimmed.includes(
        "://",
      );
    }
  },
  sanitize(url) {
    return this.isSafe(url)
      ? url.trim()
      : "";
  },
};

/* TYPING ANIMATION */
export function animateTyping(
  el,
  customText = null,
) {
  if (!el) return;
  const text =
    customText ||
    el.textContent ||
    "";
  if (!text) return;
  el.textContent = "";
  el.classList.add("typing");
  let i = 0;
  const speed = 28;
  const t = setInterval(
    () => {
      el.textContent +=
        text.charAt(i++);
      if (i >= text.length) {
        clearInterval(t);
        el.classList.remove(
          "typing",
        );
      }
    },
    speed +
      Math.floor(
        Math.random() * 20,
      ),
  );
}

export function mulaiKetikHero() {
  const el =
    document.getElementById(
      "slogan-pahlawan",
    );
  const text =
    (typeof G !== "undefined" &&
      G.sloganHero) ||
    el?.dataset?.fallback ||
    (el && el.textContent) ||
    "";
  animateTyping(el, text);
}

/* COUNTER ANIMATION */
export function animateCounter(
  el,
  target,
  duration = 1200,
) {
  if (!el) return;
  const start = performance.now();
  const startVal = 0;
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(
      elapsed / duration,
      1,
    );
    const eased =
      1 -
      Math.pow(1 - progress, 3);
    el.textContent = Math.round(
      startVal +
        (target - startVal) *
          eased,
    );
    if (progress < 1)
      requestAnimationFrame(
        update,
      );
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

/* MAKE INITIALS */
export function makeInitials(
  name = "",
) {
  return name
    .split(" ")
    .slice(0, 2)
    .map(
      (w) =>
        w[0]?.toUpperCase() || "",
    )
    .join("");
}

/* RENDER AVATAR */
export function renderAvatar(
  member,
  size = "lg",
) {
  if (
    member.foto &&
    URLValidator.isSafe(
      member.foto,
    )
  ) {
    return `<img src="${member.foto}" alt="${member.nama}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <span style="display:none">${makeInitials(member.nama)}</span>`;
  }
  return `<span>${makeInitials(member.nama)}</span>`;
}

/* SHOW NOTIFICATION TOAST */
export function showNotification(
  msg,
) {
  let toast =
    document.getElementById(
      "notif-toast",
    );
  if (!toast) {
    toast =
      document.createElement(
        "div",
      );
    toast.id = "notif-toast";
    toast.setAttribute(
      "role",
      "status",
    );
    toast.setAttribute(
      "aria-live",
      "polite",
    );
    Object.assign(toast.style, {
      position: "fixed",
      bottom: "80px",
      left: "50%",
      transform:
        "translateX(-50%) translateY(12px)",
      background:
        "var(--surface-glass, rgba(0,0,0,0.85))",
      backdropFilter: "blur(12px)",
      color: "var(--text-1, #fff)",
      padding: "8px 18px",
      borderRadius: "20px",
      fontSize: "0.78rem",
      fontFamily:
        '"Fira Code", monospace',
      border:
        "1px solid var(--border-mid, rgba(255,255,255,0.1))",
      zIndex: "9000",
      opacity: "0",
      pointerEvents: "none",
      transition:
        "opacity 0.3s, transform 0.3s",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(
      toast,
    );
  }
  toast.textContent = msg;
  toast.style.opacity = "1";
  toast.style.transform =
    "translateX(-50%) translateY(0)";
  clearTimeout(toast._tid);
  toast._tid = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform =
      "translateX(-50%) translateY(12px)";
  }, 2200);
}

/* FOCUS TRAP */
let _focusTrap = null,
  _prevActive = null;
function _isElement(el) {
  return el && el.nodeType === 1;
}

export function enableFocusTrap(
  wadah,
) {
  if (!_isElement(wadah)) return;
  _prevActive =
    document.activeElement;
  const focusable =
    wadah.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
    );
  const list = Array.from(
    focusable,
  ).filter(
    (el) =>
      !el.hasAttribute("disabled"),
  );
  if (!list.length)
    wadah
      .querySelector(
        "button, [data-focus]",
      )
      ?.setAttribute(
        "tabindex",
        "0",
      );
  _focusTrap = (e) => {
    if (e.key !== "Tab") return;
    const els = Array.from(
      wadah.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    );
    const filtered = els.filter(
      (el) =>
        !el.hasAttribute(
          "disabled",
        ),
    );
    if (!filtered.length) {
      e.preventDefault();
      return;
    }
    const first = filtered[0],
      last =
        filtered[
          filtered.length - 1
        ];
    if (e.shiftKey) {
      if (
        document.activeElement ===
        first
      ) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (
        document.activeElement ===
        last
      ) {
        e.preventDefault();
        first.focus();
      }
    }
  };
  document.addEventListener(
    "keydown",
    _focusTrap,
  );
  const first =
    list[0] ||
    wadah.querySelector(
      "[data-focus], button",
    );
  if (first) first.focus();
}

export function disableFocusTrap() {
  if (_focusTrap) {
    document.removeEventListener(
      "keydown",
      _focusTrap,
    );
    _focusTrap = null;
  }
  if (
    _prevActive &&
    _isElement(_prevActive)
  ) {
    try {
      _prevActive.focus();
    } catch {}
  }
  _prevActive = null;
}

/* REVEAL OBSERVER */
export const RevealObserver =
  (function () {
    let io = null;
    function getObserver() {
      if (!io)
        io =
          new IntersectionObserver(
            (entries) =>
              entries.forEach(
                (e) => {
                  if (
                    e.isIntersecting
                  ) {
                    e.target.classList.add(
                      "on",
                    );
                    io.unobserve(
                      e.target,
                    );
                  }
                },
              ),
            {
              threshold: 0.1,
              rootMargin:
                "0px 0px -40px 0px",
            },
          );
      return io;
    }
    return {
      observe(els) {
        const o = getObserver();
        (els instanceof NodeList ||
        Array.isArray(els)
          ? els
          : [els]
        ).forEach((el) => {
          if (
            el &&
            !el.classList.contains(
              "on",
            )
          )
            o.observe(el);
        });
      },
    };
  })();

export function initReveal() {
  RevealObserver.observe(
    document.querySelectorAll(
      ".reveal:not(.on)",
    ),
  );
}

/* SCROLL PROGRESS */
export function mulaiProgresGulir() {
  const bar =
    document.getElementById(
      "progres-gulir",
    );
  if (!bar) return;
  let ticking = false;
  function update() {
    const h =
      document.documentElement
        .scrollHeight -
      window.innerHeight;
    const pct =
      h > 0
        ? Math.min(
            100,
            Math.max(
              0,
              (window.scrollY /
                h) *
                100,
            ),
          )
        : 0;
    bar.style.width = pct + "%";
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(
          update,
        );
        ticking = true;
      }
    },
    { passive: true },
  );
  update();
}

/* SECRET CODE */
export function mulaiKodeRahasia() {
  const seq = ["t", "k", "j"];
  let buf = [];
  document.addEventListener(
    "keydown",
    (e) => {
      buf.push(
        e.key.toLowerCase(),
      );
      if (buf.length > seq.length)
        buf.shift();
      if (
        buf.join("") ===
        seq.join("")
      ) {
        const root =
          document.documentElement;
        const current =
          getComputedStyle(root)
            .getPropertyValue(
              "--accent",
            )
            .trim() || "#ef4444";
        const alt =
          current === "#ef4444"
            ? "#0ea5a4"
            : "#ef4444";
        root.style.setProperty(
          "--accent",
          alt,
        );
        showNotification(
          "🎉 Rahasia ditemukan! Warna aksen diubah.",
        );
      }
    },
  );
}

/* PAGE PROGRESS BAR */
export function initProgressBar() {
  const bar =
    document.getElementById(
      "progres-halaman",
    );
  if (!bar) return;
  document
    .querySelectorAll("a[href]")
    .forEach((link) => {
      const href =
        link.getAttribute(
          "href",
        ) || "";
      if (
        href.startsWith("#") ||
        href.startsWith(
          "javascript",
        ) ||
        href.startsWith(
          "mailto",
        ) ||
        href.startsWith("http")
      )
        return;
      link.addEventListener(
        "click",
        (e) => {
          if (
            e.ctrlKey ||
            e.metaKey ||
            e.shiftKey
          )
            return;
          bar.style.width = "0%";
          bar.classList.add(
            "aktif",
          );
          let w = 0;
          const t = setInterval(
            () => {
              w = Math.min(
                w +
                  Math.random() *
                    15,
                80,
              );
              bar.style.width =
                w + "%";
            },
            80,
          );
          setTimeout(() => {
            clearInterval(t);
            bar.style.width =
              "100%";
            setTimeout(() => {
              bar.classList.remove(
                "aktif",
              );
              bar.style.width =
                "0%";
            }, 400);
          }, 400);
        },
      );
    });
}

/* CLOCK */
export function mulaiJam() {
  const el =
    document.getElementById(
      "global-clock",
    );
  if (!el) return;
  const clockText =
    el.querySelector(
      ".clock-text",
    ) || el;
  let dragging = false,
    startX = 0,
    startY = 0,
    startLeft = 0,
    startTop = 0;

  function updateClock() {
    const now = new Date();
    const h = String(
      now.getHours(),
    ).padStart(2, "0");
    const m = String(
      now.getMinutes(),
    ).padStart(2, "0");
    const s = String(
      now.getSeconds(),
    ).padStart(2, "0");
    clockText.textContent = `${h}:${m}:${s}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Draggable
  function startDrag(e) {
    dragging = true;
    el.classList.add("dragging");
    const touch = e.touches
      ? e.touches[0]
      : e;
    startX = touch.clientX;
    startY = touch.clientY;
    const rect =
      el.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    e.preventDefault();
  }
  function onDrag(e) {
    if (!dragging) return;
    const touch = e.touches
      ? e.touches[0]
      : e;
    const dx =
        touch.clientX - startX,
      dy = touch.clientY - startY;
    const newLeft = Math.max(
      0,
      Math.min(
        window.innerWidth -
          el.offsetWidth,
        startLeft + dx,
      ),
    );
    const newTop = Math.max(
      0,
      Math.min(
        window.innerHeight -
          el.offsetHeight,
        startTop + dy,
      ),
    );
    el.style.left = newLeft + "px";
    el.style.top = newTop + "px";
    el.style.right = "auto";
  }
  function endDrag() {
    dragging = false;
    el.classList.remove(
      "dragging",
    );
  }

  el.addEventListener(
    "mousedown",
    startDrag,
  );
  el.addEventListener(
    "touchstart",
    startDrag,
    { passive: false },
  );
  document.addEventListener(
    "mousemove",
    onDrag,
  );
  document.addEventListener(
    "touchmove",
    onDrag,
    { passive: false },
  );
  document.addEventListener(
    "mouseup",
    endDrag,
  );
  document.addEventListener(
    "touchend",
    endDrag,
  );
}
