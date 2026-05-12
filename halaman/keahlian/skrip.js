/* ================================================================
   halaman/keahlian/skrip.js — TKJ XI-9
   ================================================================ */
import { G } from "../../pokok/skrip/pengaturan.js";
import { initReveal } from "../../pokok/skrip/alat.js";

document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  initReveal();
});

// Use our own robust animateCounter as fallback or main
function animateCounter(el, target, duration = 1200) {
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out cubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const currentVal = Math.floor(easeProgress * target);
    
    el.textContent = currentVal + "%";
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target + "%";
    }
  }
  
  requestAnimationFrame(update);
}

function renderSkills() {
  const container = document.getElementById("skills-list");
  if (!container || !G.skills || !Array.isArray(G.skills)) return;

  const frag = document.createDocumentFragment();

  G.skills.forEach((skill, idx) => {
    // Determine level tag
    let levelClass = "intermediate";
    let levelText = "Intermediate";
    if (skill.level >= 85) { levelClass = "expert"; levelText = "Expert"; }
    else if (skill.level >= 70) { levelClass = "advanced"; levelText = "Advanced"; }

    const card = document.createElement("div");
    card.className = "skill-card reveal";
    card.style.setProperty("--d", `${(idx % 4) * 0.1}s`);
    card.setAttribute("data-level", "0"); // Initially 0 for animation
    
    const top = document.createElement("div");
    top.className = "skill-top";
    
    const iconWrapper = document.createElement("div");
    iconWrapper.style.fontSize = "1.5rem";
    iconWrapper.style.color = "var(--primary)";
    iconWrapper.style.width = "40px";
    iconWrapper.style.textAlign = "center";
    iconWrapper.innerHTML = `<i class="${skill.icon}" aria-hidden="true"></i>`;
    
    const info = document.createElement("div");
    info.className = "skill-info";
    
    const nameWrap = document.createElement("div");
    nameWrap.style.display = "flex";
    nameWrap.style.justifyContent = "space-between";
    nameWrap.style.alignItems = "center";
    nameWrap.style.marginBottom = "6px";
    
    const name = document.createElement("h3");
    name.className = "skill-name";
    name.textContent = skill.nama;
    
    const tag = document.createElement("span");
    tag.className = `skill-level-tag ${levelClass}`;
    tag.textContent = levelText;
    
    nameWrap.appendChild(name);
    nameWrap.appendChild(tag);
    
    const desc = document.createElement("p");
    desc.className = "skill-desc";
    desc.textContent = skill.desc;
    
    info.appendChild(nameWrap);
    info.appendChild(desc);
    
    const pct = document.createElement("div");
    pct.className = "skill-pct";
    pct.textContent = "0%";
    pct.setAttribute("data-target", skill.level);
    
    top.appendChild(iconWrapper);
    top.appendChild(info);
    top.appendChild(pct);
    
    const barBg = document.createElement("div");
    barBg.className = "bar-bg";
    
    const barFill = document.createElement("div");
    barFill.className = "bar-fill";
    barFill.setAttribute("data-width", `${skill.level}%`);
    barFill.style.width = "0%";
    
    barBg.appendChild(barFill);
    
    card.appendChild(top);
    card.appendChild(barBg);
    
    frag.appendChild(card);
  });

  container.innerHTML = "";
  container.appendChild(frag);

  // Initialize IntersectionObserver to trigger animations when scrolled into view
  initSkillAnimations();
}

function initSkillAnimations() {
  const cards = document.querySelectorAll(".skill-card");
  if (!cards.length) return;

  const ob = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const bar = card.querySelector(".bar-fill");
          const pct = card.querySelector(".skill-pct");
          
          if (bar && pct) {
            const targetW = bar.getAttribute("data-width") || "0%";
            const targetPct = parseInt(pct.getAttribute("data-target") || "0", 10);
            
            // Trigger bar animation
            requestAnimationFrame(() => {
              bar.style.width = targetW;
              setTimeout(() => bar.classList.add("filled"), 1200); // add glow effect after animation
            });
            
            // Trigger counter animation
            animateCounter(pct, targetPct, 1200);
            
            // Set watermark level after animation completes
            setTimeout(() => {
              card.setAttribute("data-level", targetPct);
            }, 1200);
          }
          
          observer.unobserve(card); // Only animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  cards.forEach((card) => {
    ob.observe(card);
  });
}
