/* =====================================================================
   background.js — SFONDO A PARTICELLE
   Disegna su un <canvas> dei punti bianchi che si muovono lentamente.
   I punti vicini tra loro vengono uniti da una linea, e quelli vicini
   al mouse vengono attratti e collegati al cursore.

   Come funziona un'animazione su canvas:
     1. ad ogni fotogramma (circa 60 al secondo) si cancella tutto
     2. si aggiorna la posizione di ogni punto
     3. si ridisegna tutto
   requestAnimationFrame(disegna) chiede al browser di richiamare
   disegna() al prossimo fotogramma: è il "motore" dell'animazione.
   ===================================================================== */

function initSfondo() {
  const canvas = document.getElementById("sfondo");
  const ctx = canvas.getContext("2d");
  const fermo = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let larghezza, altezza, punti = [];
  const mouse = { x: -9999, y: -9999 };   // fuori schermo finché non si muove
  const DISTANZA_LINEA = 120;             // sotto questa distanza due punti si collegano
  const RAGGIO_MOUSE = 180;               // area di influenza del cursore

  // Adatta il canvas alla finestra e (ri)crea i punti
  function ridimensiona() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // nitido sugli schermi retina
    larghezza = window.innerWidth;
    altezza = window.innerHeight;
    canvas.width = larghezza * dpr;
    canvas.height = altezza * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // meno punti sui telefoni: meno calcoli, batteria salva
    const quanti = Math.round((larghezza * altezza) / 16000);
    punti = Array.from({ length: Math.min(quanti, 120) }, () => ({
      x: Math.random() * larghezza,
      y: Math.random() * altezza,
      vx: (Math.random() - 0.5) * 0.3,    // velocità orizzontale
      vy: (Math.random() - 0.5) * 0.3,    // velocità verticale
      r: Math.random() * 1.4 + 0.4        // raggio del punto
    }));
  }

  function disegna() {
    ctx.clearRect(0, 0, larghezza, altezza);

    for (const p of punti) {
      // movimento + rimbalzo sui bordi
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > larghezza) p.vx *= -1;
      if (p.y < 0 || p.y > altezza) p.vy *= -1;

      // attrazione leggera verso il mouse
      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const d = Math.hypot(dx, dy);
      if (d < RAGGIO_MOUSE) {
        p.x += dx * 0.004; p.y += dy * 0.004;
        ctx.strokeStyle = `rgba(124, 243, 255, ${1 - d / RAGGIO_MOUSE})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }

      ctx.fillStyle = "rgba(245, 245, 247, 0.8)";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    }

    // linee tra punti vicini: più sono vicini, più la linea è visibile
    for (let i = 0; i < punti.length; i++) {
      for (let j = i + 1; j < punti.length; j++) {
        const a = punti[i], b = punti[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < DISTANZA_LINEA) {
          ctx.strokeStyle = `rgba(245, 245, 247, ${(1 - d / DISTANZA_LINEA) * 0.18})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    if (!fermo) requestAnimationFrame(disegna);
  }

  window.addEventListener("resize", ridimensiona);
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  window.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });

  ridimensiona();
  disegna();
}
