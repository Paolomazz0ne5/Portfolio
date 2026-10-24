/* =====================================================================
   router.js — NAVIGAZIONE TRA LE PAGINE
   Le quattro pagine sono nello stesso file HTML. Il "router" legge la
   parte dell'indirizzo dopo il # (es. #progetti) e:
     - aggiunge la classe .attiva alla sezione giusta (il CSS la mostra
       e la fa entrare con l'animazione "entra")
     - evidenzia il link nel menu e sposta la barretta luminosa sotto di lui
     - avvisa gli altri componenti con un evento "cambiovista", così
       ad esempio l'Istruzione può far ripartire gli anelli dei voti
   L'evento "hashchange" scatta ogni volta che il # nell'indirizzo cambia
   (clic su un link interno, tasto indietro del browser...).
   ===================================================================== */

function initRouter() {
  const viste = [...document.querySelectorAll(".vista")];
  const link = [...document.querySelectorAll("#menu a")];
  const indicatore = document.getElementById("indicatore");
  const nomi = viste.map((v) => v.id);

  function sposta(linkAttivo) {
    if (!linkAttivo) return;
    indicatore.style.width = linkAttivo.offsetWidth + "px";
    indicatore.style.transform = `translateX(${linkAttivo.offsetLeft}px)`;
  }

  function mostra() {
    const richiesta = location.hash.slice(1);             // "#progetti" -> "progetti"
    const nome = nomi.includes(richiesta) ? richiesta : "home";

    viste.forEach((v) => v.classList.toggle("attiva", v.id === nome));
    link.forEach((a) => a.classList.toggle("attivo", a.dataset.vista === nome));
    sposta(link.find((a) => a.dataset.vista === nome));

    window.scrollTo({ top: 0 });
    document.dispatchEvent(new CustomEvent("cambiovista", { detail: nome }));
  }

  window.addEventListener("hashchange", mostra);
  window.addEventListener("resize", () => sposta(document.querySelector("#menu a.attivo")));
  mostra();
}
