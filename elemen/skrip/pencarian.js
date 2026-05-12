/* ================================================================
   elemen/skrip/pencarian.js — TKJ XI-9 | Search Component
   ================================================================ */

/**
 * Inisialisasi komponen pencarian anggota
 * @param {Object} opts - { gridId, searchId, clearId, countId, data }
 */
export function initPencarian({ gridId, searchId, clearId, countId, data = [] }) {
  const grid = document.getElementById(gridId);
  const search = document.getElementById(searchId);
  const clearBtn = document.getElementById(clearId);
  const countEl = document.getElementById(countId);
  let rafId = null;

  function render(filter = "") {
    const q = filter.toLowerCase().trim();
    const list = q ? data.filter(s => (s.nama || "").toLowerCase().includes(q)) : data;
    if (countEl) countEl.textContent = q ? `Menampilkan ${list.length} dari ${data.length} anggota` : `Semua ${data.length} anggota`;
    return list;
  }

  if (search) {
    search.addEventListener("input", () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        render(search.value);
        clearBtn?.classList.toggle("terlihat", search.value.length > 0);
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (search) { search.value = ""; search.dispatchEvent(new Event("input")); search.focus(); }
    });
  }

  return { render };
}
