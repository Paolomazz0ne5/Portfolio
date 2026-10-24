/* =====================================================================
   education.js — PAGINA ISTRUZIONE
   Crea una "tappa" della timeline per ogni titolo di studio. Dove c'è un
   voto disegna un anello SVG che si riempie in proporzione (105/110).

   Il trucco dell'anello: un cerchio SVG ha un contorno lungo
   2·π·raggio. Con stroke-dasharray = lunghezza e stroke-dashoffset =
   lunghezza il contorno è invisibile; riducendo l'offset appare un
   pezzo alla volta. Il CSS anima il cambio (transition).
   ===================================================================== */

function initIstruzione(istruzione, fotoLaurea) {
  const timeline = document.getElementById("timeline");
  const RAGGIO = 54;
  const CIRCONFERENZA = 2 * Math.PI * RAGGIO;

  istruzione.forEach((t, i) => {
    const li = document.createElement("li");
    li.className = "tappa" + (t.inCorso ? " in-corso" : "");
    li.style.setProperty("--i", i);   // usato dal CSS per far entrare le tappe una dopo l'altra

    const tesi = t.tesi ? `
      <div class="tesi">
        <span class="hud">Tesi</span>
        <b>${t.tesi.titolo}</b>
        <ul>${t.tesi.punti.map((x) => `<li>${x}</li>`).join("")}</ul>
      </div>` : "";

    const anello = t.voto ? `
      <div class="anello" data-voto="${t.voto}" data-max="${t.max}">
        <svg viewBox="0 0 120 120">
          <circle class="base" cx="60" cy="60" r="${RAGGIO}"></circle>
          <circle class="valore" cx="60" cy="60" r="${RAGGIO}"
            stroke-dasharray="${CIRCONFERENZA}" stroke-dashoffset="${CIRCONFERENZA}"></circle>
        </svg>
        <div><strong>${t.voto}</strong><small>/ ${t.max}</small></div>
      </div>` : (t.inCorso ? `<span class="badge live">In corso</span>` : "");

    li.innerHTML = `
      <div class="tappa-testo">
        <span class="hud">${t.periodo}</span>
        <h3>${t.titolo}</h3>
        <span class="ente">${t.ente}</span>
        ${t.dettagli.length ? `<ul>${t.dettagli.map((d) => `<li>${d}</li>`).join("")}</ul>` : ""}
        ${tesi}
      </div>
      ${anello}`;
    timeline.appendChild(li);
  });

  // Galleria foto di laurea
  document.getElementById("foto-laurea").innerHTML = fotoLaurea.map((f) => `
    <figure>${f.src ? `<img src="${f.src}" alt="${f.didascalia}" loading="lazy">` : creaVuoto(f.didascalia)}</figure>
  `).join("");

  // Riempie gli anelli: prima li svuota, poi al fotogramma dopo imposta il valore,
  // così la transizione CSS riparte ogni volta che si apre la pagina.
  function riempi() {
    document.querySelectorAll(".anello").forEach((a) => {
      const cerchio = a.querySelector(".valore");
      const quota = a.dataset.voto / a.dataset.max;
      cerchio.style.transition = "none";
      cerchio.style.strokeDashoffset = CIRCONFERENZA;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        cerchio.style.transition = "";
        cerchio.style.strokeDashoffset = CIRCONFERENZA * (1 - quota);
      }));
    });
  }
  document.addEventListener("cambiovista", (e) => { if (e.detail === "istruzione") riempi(); });
}
