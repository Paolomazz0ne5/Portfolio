/* =====================================================================
   cursor.js — CURSORE PERSONALIZZATO
   Un cerchio che insegue il mouse con un leggero ritardo e si ingrandisce
   sopra link e bottoni. Il ritardo si ottiene con l'interpolazione:
   ad ogni fotogramma il cerchio percorre il 20% della distanza che lo
   separa dal mouse, quindi rallenta man mano che si avvicina.
   Su touch screen il CSS lo nasconde (media query pointer: fine).
   ===================================================================== */

function initCursore() {
  const cursore = document.getElementById("cursore");
  if (!matchMedia("(pointer: fine)").matches) return;

  let mouseX = innerWidth / 2, mouseY = innerHeight / 2; // dove è il mouse
  let x = mouseX, y = mouseY;                            // dove è il cerchio

  window.addEventListener("pointermove", (e) => { mouseX = e.clientX; mouseY = e.clientY; });

  // si ingrandisce sopra qualsiasi elemento cliccabile
  document.addEventListener("pointerover", (e) => {
    const cliccabile = e.target.closest("a, button, .scheda, .voce");
    cursore.classList.toggle("grande", Boolean(cliccabile));
  });

  (function segui() {
    x += (mouseX - x) * 0.2;
    y += (mouseY - y) * 0.2;
    cursore.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(segui);
  })();
}
