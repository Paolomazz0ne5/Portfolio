/* =====================================================================
   projects.js — PAGINA PROGETTI
   1. crea i bottoni filtro (Tutti, Web, AI, Giochi)
   2. crea una scheda per ogni progetto in data.progetti
   3. effetto 3D: la scheda si inclina seguendo il mouse
   4. clic su una scheda -> si apre la modale con descrizione, foto e video
   ===================================================================== */

function initProgetti(progetti) {
  const lista = document.getElementById("lista-progetti");
  const filtriBox = document.getElementById("filtri");
  const fine = matchMedia("(pointer: fine)").matches;

  // Restituisce l'HTML giusto per un media: immagine, video o segnaposto
  function media(m, autoplay) {
    if (!m || !m.src) return creaVuoto(m && m.tipo === "video" ? "Video" : "Foto", m && m.tipo);
    if (m.tipo === "video") {
      // muted + playsinline sono necessari perché i browser permettano l'autoplay
      return `<video src="${m.src}" ${autoplay ? "autoplay muted loop playsinline" : "controls playsinline"}></video>`;
    }
    return `<img src="${m.src}" alt="" loading="lazy">`;
  }

  // --- 1. Filtri ---
  const categorie = { tutti: "Tutti", web: "Web", ai: "AI", giochi: "Giochi" };
  for (const [chiave, etichetta] of Object.entries(categorie)) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "filtro";
    b.textContent = etichetta;
    b.setAttribute("aria-pressed", chiave === "tutti");
    b.addEventListener("click", () => {
      filtriBox.querySelectorAll(".filtro").forEach((x) => x.setAttribute("aria-pressed", x === b));
      // le schede escluse non spariscono: si spengono (classe .filtrata)
      lista.querySelectorAll(".scheda").forEach((s) =>
        s.classList.toggle("filtrata", chiave !== "tutti" && s.dataset.categoria !== chiave));
    });
    filtriBox.appendChild(b);
  }

  // --- 2. Schede ---
  progetti.forEach((p) => {
    const scheda = document.createElement("button");
    scheda.type = "button";
    scheda.className = "scheda";
    scheda.dataset.categoria = p.categoria;
    scheda.innerHTML = `
      <div class="scheda-media">${media(p.media[0], true)}</div>
      <div class="scheda-corpo">
        <div class="scheda-top">
          <h3>${p.titolo}</h3>
          <span class="badge ${p.stato === "in corso" ? "live" : ""}">${p.stato === "in corso" ? "In corso" : p.etichetta}</span>
        </div>
        <p>${p.breve}</p>
        <div class="tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>
      </div>`;

    // --- 3. Inclinazione 3D e bagliore ---
    scheda.addEventListener("pointermove", (e) => {
      const r = scheda.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;   // 0 = bordo sinistro, 1 = destro
      const y = (e.clientY - r.top) / r.height;
      scheda.style.setProperty("--mx", x * 100 + "%");
      scheda.style.setProperty("--my", y * 100 + "%");
      if (fine) scheda.style.transform =
        `perspective(900px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 10}deg) translateY(-4px)`;
    });
    scheda.addEventListener("pointerleave", () => { scheda.style.transform = ""; });

    scheda.addEventListener("click", () => apri(p));
    lista.appendChild(scheda);
  });

  // --- 4. Modale ---
  const modale = document.getElementById("modale");
  const contenuto = document.getElementById("modale-contenuto");

  function apri(p) {
    contenuto.innerHTML = `
      <p class="hud">// progetto · ${p.etichetta}</p>
      <h3 id="modale-titolo">${p.titolo}</h3>
      <div class="modale-media">${p.media.map((m) => `<div>${media(m, false)}</div>`).join("")}</div>
      <p>${p.descrizione}</p>
      <div class="tech">${p.tech.map((t) => `<span>${t}</span>`).join("")}</div>`;
    modale.hidden = false;
    document.body.style.overflow = "hidden";   // blocca lo scroll della pagina sotto
    modale.querySelector(".chiudi").focus();
  }
  function chiudi() {
    modale.hidden = true;
    document.body.style.overflow = "";
    contenuto.querySelectorAll("video").forEach((v) => v.pause());
  }
  modale.addEventListener("click", (e) => { if (e.target.closest("[data-chiudi]")) chiudi(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modale.hidden) chiudi(); });
}
