/* =====================================================================
   skills.js — PAGINA COMPETENZE
   Due parti:
   - l'ORBITA (decorativa): tre anelli concentrici che ruotano, con sopra
     alcune competenze. Ogni etichetta è messa sul bordo del suo anello
     con un po' di trigonometria (coseno e seno dell'angolo).
   - i GRUPPI: l'elenco completo e leggibile, preso dal CV.
   ===================================================================== */

function initCompetenze(competenze, lingue) {
  // --- Orbita ---
  const orbita = document.getElementById("orbita");
  const anelli = [
    { voci: ["React", "Next.js", "TypeScript"], dimensione: 46, tempo: "26s" },
    { voci: ["RAG", "ChromaDB", "Voyage AI", "LLM"], dimensione: 72, tempo: "38s", inverso: true },
    { voci: ["Java", "C++", "SQL", "Godot", "Figma"], dimensione: 98, tempo: "54s" }
  ];
  orbita.innerHTML = `<div class="nucleo">PM</div>`;
  anelli.forEach((a) => {
    const anello = document.createElement("div");
    anello.className = "anello-orbita" + (a.inverso ? " inverso" : "");
    const margine = (100 - a.dimensione) / 2;
    anello.style.inset = margine + "%";
    anello.style.setProperty("--t", a.tempo);
    a.voci.forEach((v, i) => {
      const angolo = (i / a.voci.length) * Math.PI * 2;  // voci distribuite in modo uniforme
      const p = document.createElement("span");
      p.className = "pianeta";
      p.textContent = v;
      p.style.setProperty("--t", a.tempo);
      p.style.left = 50 + 50 * Math.cos(angolo) + "%";
      p.style.top = 50 + 50 * Math.sin(angolo) + "%";
      anello.appendChild(p);
    });
    orbita.appendChild(anello);
  });

  // --- Gruppi dal CV ---
  let n = 0; // contatore globale per far comparire le voci una dopo l'altra
  const gruppi = competenze.map((g) => `
    <div class="gruppo">
      <h3>${g.gruppo}</h3>
      <div class="voci">${g.voci.map((v) => `<span class="voce" style="--i:${n++}">${v}</span>`).join("")}</div>
    </div>`).join("");
  const bloccoLingue = `
    <div class="gruppo">
      <h3>Lingue</h3>
      ${lingue.map((l) => `
        <div class="lingua"><span>${l.lingua}</span><span class="barra"><i style="--v:${l.valore}%"></i></span><span>${l.livello}</span></div>`).join("")}
    </div>`;
  document.getElementById("gruppi").innerHTML = gruppi + bloccoLingue;
}
