/* =====================================================================
   home.js — TESTI ANIMATI DELLA HOME
   - nome con effetto glitch (l'effetto è tutto CSS: qui copiamo solo il
     testo in data-text, da cui il CSS crea le due copie colorate)
   - "typer": scrive e cancella i ruoli una lettera alla volta
   - contatori: i numeri salgono da 0 al valore finale
   ===================================================================== */

function initHome(persona) {
  const fermo = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const nome = document.getElementById("nome");
  nome.textContent = `${persona.nome} ${persona.cognome}`;
  nome.dataset.text = nome.textContent;
  document.getElementById("bio").textContent = persona.bio;
  document.getElementById("luogo").textContent = persona.luogo;
  document.getElementById("contatti").innerHTML =
    `<a href="mailto:${persona.email}">${persona.email}</a> · <a href="${persona.github}" target="_blank" rel="noopener">GitHub ↗</a>`;

  // --- Typer ---
  // Una piccola "macchina a stati": o sta scrivendo o sta cancellando.
  const typer = document.getElementById("typer");
  if (fermo) { typer.textContent = persona.ruoli[0]; }
  else {
    let r = 0, lettere = 0, cancella = false;
    (function passo() {
      const frase = persona.ruoli[r];
      lettere += cancella ? -1 : 1;
      typer.textContent = frase.slice(0, lettere);
      let attesa = cancella ? 35 : 70;                   // si cancella più in fretta
      if (!cancella && lettere === frase.length) { cancella = true; attesa = 1800; } // pausa a frase completa
      if (cancella && lettere === 0) { cancella = false; r = (r + 1) % persona.ruoli.length; attesa = 300; }
      setTimeout(passo, attesa);
    })();
  }

  // --- Contatori ---
  // Si riattivano ogni volta che si torna sulla home.
  function conta() {
    document.querySelectorAll(".conta").forEach((el) => {
      const fine = Number(el.dataset.fino), inizio = performance.now(), durata = 1400;
      if (fermo) { el.textContent = fine; return; }
      (function frame(t) {
        const p = Math.min(1, (t - inizio) / durata);
        const morbido = 1 - Math.pow(1 - p, 3);          // "ease-out": veloce all'inizio, lento alla fine
        el.textContent = Math.round(fine * morbido);
        if (p < 1) requestAnimationFrame(frame);
      })(inizio);
    });
  }
  document.addEventListener("cambiovista", (e) => { if (e.detail === "home") conta(); });
}
