/* ================================================================
   halaman/galeri/skrip.js — TKJ XI-9
   ================================================================ */
import { G } from "../../pokok/skrip/pengaturan.js";
import {
  initReveal,
  enableFocusTrap,
  disableFocusTrap,
} from "../../pokok/skrip/alat.js";

document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  initReveal();
  initGalleryLightbox();
});

let carouselIndex = 0;
const carouselItemsData = [];

function renderGallery() {
  const grid = document.getElementById("grid-galeri");
  const carousel = document.getElementById("carousel-3d");
  const dotsContainer = document.getElementById("carousel-3d-dots");

  if (!G.galeri || !Array.isArray(G.galeri)) return;

  // Render Grid
  if (grid) {
    const fragGrid = document.createDocumentFragment();
    G.galeri.forEach((item, idx) => {
      const wrapper = document.createElement("div");
      wrapper.className = "item-galeri reveal";
      wrapper.style.setProperty("--d", `${(idx % 5) * 0.05}s`);
      wrapper.setAttribute("tabindex", "0");

      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "Galeri foto";
      img.loading = "lazy";
      img.onload = () => img.classList.add("loaded");
      wrapper.appendChild(img);

      if (item.caption) {
        const cap = document.createElement("div");
        cap.className = "keterangan-galeri";
        const span = document.createElement("span");
        span.textContent = item.caption;
        cap.appendChild(span);
        wrapper.appendChild(cap);
      }

      fragGrid.appendChild(wrapper);
    });
    grid.innerHTML = "";
    grid.appendChild(fragGrid);
  }

  // Render Carousel
  if (carousel && dotsContainer) {
    // Take first 5 items for carousel
    const carouselData = G.galeri.slice(0, 5);
    if (carouselData.length === 0) {
      document.querySelector('.carousel-3d-wrapper').style.display = 'none';
      return;
    }

    const fragCarousel = document.createDocumentFragment();
    const fragDots = document.createDocumentFragment();

    carouselData.forEach((item, idx) => {
      carouselItemsData.push(item);
      
      const el = document.createElement("div");
      el.className = "carousel-item";
      el.dataset.index = idx;
      
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = item.caption || "Carousel item";
      // pre-decode for better performance if possible
      img.decoding = "async";
      
      el.appendChild(img);
      fragCarousel.appendChild(el);

      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.dataset.index = idx;
      dot.setAttribute("aria-label", `Pergi ke slide ${idx + 1}`);
      fragDots.appendChild(dot);
    });

    carousel.innerHTML = "";
    carousel.appendChild(fragCarousel);
    
    dotsContainer.innerHTML = "";
    dotsContainer.appendChild(fragDots);

    updateCarousel();

    // Event listeners
    document.getElementById("carousel-3d-prev")?.addEventListener("click", () => moveCarousel(-1));
    document.getElementById("carousel-3d-next")?.addEventListener("click", () => moveCarousel(1));
    
    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("carousel-dot")) {
        carouselIndex = parseInt(e.target.dataset.index);
        updateCarousel();
      }
    });

    // Auto play setup
    let autoPlay = setInterval(() => moveCarousel(1), 3500);
    const wrapper = document.querySelector('.carousel-3d-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(autoPlay));
      wrapper.addEventListener('mouseleave', () => {
        autoPlay = setInterval(() => moveCarousel(1), 3500);
      });
    }
    
    // Click on carousel item to open lightbox
    carousel.addEventListener('click', (e) => {
      const item = e.target.closest('.carousel-item');
      if (item && item.classList.contains('active')) {
        const idx = parseInt(item.dataset.index);
        const data = carouselItemsData[idx];
        if (data && typeof window.terbukaLightbox === 'function') {
          window.terbukaLightbox(data.src, data.caption);
        }
      } else if (item) {
        // If clicking a side item, navigate to it
        carouselIndex = parseInt(item.dataset.index);
        updateCarousel();
      }
    });
  }
}

function moveCarousel(direction) {
  const max = carouselItemsData.length;
  if (max === 0) return;
  carouselIndex = (carouselIndex + direction + max) % max;
  updateCarousel();
}

function updateCarousel() {
  const items = document.querySelectorAll(".carousel-item");
  const dots = document.querySelectorAll(".carousel-dot");
  const max = items.length;

  items.forEach((item, idx) => {
    item.className = "carousel-item"; // reset classes
    
    if (idx === carouselIndex) {
      item.classList.add("active");
    } else if (idx === (carouselIndex - 1 + max) % max) {
      item.classList.add("prev");
    } else if (idx === (carouselIndex + 1) % max) {
      item.classList.add("next");
    } else if (idx === (carouselIndex - 2 + max) % max) {
      item.classList.add("prev-hidden");
    } else {
      item.classList.add("next-hidden");
    }
  });

  dots.forEach((dot, idx) => {
    if (idx === carouselIndex) {
      dot.classList.add("active");
      dot.setAttribute("aria-selected", "true");
    } else {
      dot.classList.remove("active");
      dot.setAttribute("aria-selected", "false");
    }
  });
}

function initGalleryLightbox() {
  const grid = document.getElementById("grid-galeri");
  const lightbox = document.getElementById("jendela-gambar");
  const tutupBtn = document.getElementById("tutup-jendela");
  const img = document.getElementById("lightbox-img");
  const caption = document.getElementById("lb-caption-bar");

  if (!grid || !lightbox || !tutupBtn || !img || !caption) return;

  window.terbukaLightbox = function(src, text) {
    if (!src) return;
    img.src = src;
    caption.textContent = text || "";
    lightbox.classList.add("terbuka");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    tutupBtn?.focus();
    enableFocusTrap(lightbox);
  };

  function tutupLightbox() {
    lightbox.classList.remove("terbuka");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    disableFocusTrap();
  }

  // Click delegation for grid items
  grid.addEventListener("click", (e) => {
    const item = e.target.closest(".item-galeri");
    if (!item) return;
    const image = item.querySelector("img");
    const text = item.querySelector(".keterangan-galeri span")?.textContent || "";
    if (image && image.src) window.terbukaLightbox(image.src, text);
  });
  
  // Enter key support for accessibility
  grid.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const item = e.target.closest(".item-galeri");
      if (!item) return;
      e.preventDefault();
      const image = item.querySelector("img");
      const text = item.querySelector(".keterangan-galeri span")?.textContent || "";
      if (image && image.src) window.terbukaLightbox(image.src, text);
    }
  });

  tutupBtn.addEventListener("click", tutupLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) tutupLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("terbuka")) {
      tutupLightbox();
    }
  });
}
