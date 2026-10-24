/* =====================================================================
   carousel.js — CAROSELLO FOTO DELLA HOME
   Idea: tutte le foto sono impilate una sopra l'altra. Una variabile
   `indice` dice quale è in primo piano. Ogni volta che cambia, diamo a
   ogni slide una classe in base alla sua posizione:
       .attuale     quella visibile
       .prossima    quella dopo (si vede di lato, in 3D)
       .precedente  quella appena uscita
       .nascosta    tutte le altre
   Le animazioni le fa il CSS (transition su transform e opacity).

   Scorrimento automatico: un timer chiama avanti() ogni DURATA ms.
   Si mette in pausa quando il mouse è sopra al carosello.
   Su telefono si può scorrere col dito (swipe).
   ===================================================================== */

function initCarosello(foto) {
  const DURATA = 4000;
  const box = document.getElementById("carosello");
  const pista = document.getElementById("carosello-pista");
  const puntiBox = document.getElementById("carosello-punti");
  const contatore = document.getElementById("carosello-contatore");
  let indice = 0, timer = null;

  // 1. Costruisco le slide e i punti a partire dai dati
  const slide = foto.map((f, i) => {
    const el = document.createElement("figure");
    el.className = "slide";
    el.style.margin = "0";
    el.innerHTML = f.src
      ? `<img src="${f.src}" alt="${f.didascalia}" ${i ? 'loading="lazy"' : ""}>`
      : creaVuoto("Foto " + (i + 1));
    el.insertAdjacentHTML("beforeend", `<figcaption>${f.didascalia}</figcaption>`);
    pista.appendChild(el);
    return el;
  });
  const punti = foto.map((_, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "punto";
    b.setAttribute("aria-label", "Vai alla foto " + (i + 1));
    b.innerHTML = "<i></i>";
    b.addEventListener("click", () => vai(i));
    puntiBox.appendChild(b);
    return b;
  });
  box.style.setProperty("--durata", DURATA + "ms");

  // 2. Aggiorna classi, punti e contatore in base a `indice`
  function aggiorna() {
    const n = slide.length;
    slide.forEach((el, i) => {
      el.className = "slide " +
        (i === indice ? "attuale"
        : i === (indice + 1) % n ? "prossima"
        : i === (indice - 1 + n) % n ? "precedente"
        : "nascosta");
    });
    punti.forEach((p, i) => {
      p.className = "punto" + (i < indice ? " fatto" : "");
      if (i === indice) { void p.offsetWidth; p.classList.add("attivo"); } // riavvia la barretta
    });
    contatore.textContent = `${String(indice + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
  }

  function vai(i) {
    indice = (i + slide.length) % slide.length; // il % fa ripartire da capo dopo l'ultima
    aggiorna();
    riavviaTimer();
  }
  const avanti = () => vai(indice + 1);
  const indietro = () => vai(indice - 1);

  function riavviaTimer() {
    clearInterval(timer);
    if (!box.classList.contains("in-pausa")) timer = setInterval(avanti, DURATA);
  }

  // 3. Controlli: frecce, pausa al passaggio del mouse, tastiera, swipe
  document.getElementById("car-next").addEventListener("click", avanti);
  document.getElementById("car-prev").addEventListener("click", indietro);
  box.addEventListener("mouseenter", () => { box.classList.add("in-pausa"); clearInterval(timer); });
  box.addEventListener("mouseleave", () => { box.classList.remove("in-pausa"); riavviaTimer(); });
  box.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") avanti();
    if (e.key === "ArrowLeft") indietro();
  });
  let inizioX = null;
  pista.addEventListener("pointerdown", (e) => { inizioX = e.clientX; });
  pista.addEventListener("pointerup", (e) => {
    if (inizioX === null) return;
    const delta = e.clientX - inizioX;
    if (Math.abs(delta) > 40) delta < 0 ? avanti() : indietro();
    inizioX = null;
  });

  aggiorna();
  riavviaTimer();
}

/* Riquadro segnaposto per un media che ancora non c'è.
   Usato anche da projects.js ed education.js. */
function creaVuoto(etichetta, tipo = "foto") {
  const icona = tipo === "video" ? "▶" : "◎";
  return `<div class="vuoto"><span><b>${icona}</b>${etichetta}<br>in arrivo</span></div>`;
}
