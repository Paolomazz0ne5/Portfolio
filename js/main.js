/* =====================================================================
   main.js — PUNTO DI PARTENZA
   Avvia ogni componente passandogli i dati che gli servono.
   Il router va avviato per ultimo: annuncia la pagina iniziale con
   l'evento "cambiovista", e gli altri componenti devono già essere in
   ascolto per riceverlo.
   ===================================================================== */

const dati = window.PORTFOLIO;

initSfondo();
initCursore();
initHome(dati.persona);
initCarosello(dati.carosello);
initProgetti(dati.progetti);
initIstruzione(dati.istruzione, dati.fotoLaurea);
initCompetenze(dati.competenze, dati.lingue);
initRouter();
