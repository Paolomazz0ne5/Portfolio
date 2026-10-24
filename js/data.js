/* =====================================================================
   data.js — TUTTI I CONTENUTI DEL SITO
   ---------------------------------------------------------------------
   Qui ci sono solo dati, niente logica. Gli altri file JS leggono
   questo oggetto e costruiscono l'HTML. Per aggiungere una foto, un
   progetto o una competenza modifichi SOLO questo file.

   Media: dove trovi `null` il sito mostra un riquadro "in arrivo".
   Quando avrai le foto, mettile in assets/img/ (o assets/video/) e
   scrivi qui il percorso, es. "assets/img/laurea-1.jpg".
   ===================================================================== */

window.PORTFOLIO = {
  persona: {
    nome: "Paolo",
    cognome: "Mazzone",
    luogo: "Polignano a Mare (BA)",
    email: "mazzonepaolo05@gmail.com",
    github: "https://github.com/Paolomazz0ne5",
    // Frasi che il "typer" della home scrive e cancella a rotazione
    ruoli: [
      "Sviluppatore full-stack",
      "Costruttore di sistemi RAG",
      "Studente di AI a Bari",
      "Game developer con Godot"
    ],
    bio:
      "Laureato in Informatica e Tecnologie per la Produzione del Software con 105/110, " +
      "ora frequento la magistrale in Computer Science: Artificial Intelligence. " +
      "Sviluppo applicazioni web full-stack e sistemi basati su LLM, come chatbot e assistenti RAG, " +
      "usando strumenti AI per il coding. Sono abituato a lavorare in team e sotto pressione, " +
      "anche grazie alle esperienze nella ristorazione.",
    hobby: ["Palestra", "Musica", "Calcio", "Fashion design"]
  },

  // Foto del carosello in home. src: null = riquadro segnaposto.
  carosello: [
    { src: "assets/img/foto-profilo.jpg", didascalia: "Paolo Mazzone" },
    { src: null, didascalia: "Foto 2 · da aggiungere" },
    { src: null, didascalia: "Foto 3 · da aggiungere" },
    { src: null, didascalia: "Foto 4 · da aggiungere" }
  ],

  // categoria serve ai filtri della pagina Progetti
  progetti: [
    {
      id: "serbot",
      titolo: "SerBot",
      categoria: "ai",
      etichetta: "Tesi di laurea",
      breve: "Assistente virtuale AI basato su RAG per la didattica universitaria.",
      descrizione:
        "SerBot risponde alle domande degli studenti partendo dai materiali reali dei corsi. " +
        "Ho costruito l'intera pipeline di importazione e recupero dei contenuti con ChromaDB " +
        "ed embedding Voyage AI, il supporto a più LLM con una valutazione comparativa, " +
        "un'area riservata ai docenti, quiz e meccaniche di gamification.",
      tech: ["Next.js", "React", "TypeScript", "ChromaDB", "Voyage AI"],
      stato: "completato",
      media: [{ tipo: "img", src: null }, { tipo: "video", src: null }]
    },
    {
      id: "foodride",
      titolo: "FoodRide",
      categoria: "web",
      etichetta: "Team",
      breve: "Delivery per pizzerie che consegnano con rider propri.",
      descrizione:
        "Piattaforma di delivery pensata per le pizzerie che gestiscono la consegna con i propri rider. " +
        "Il progetto, in team, è appena partito: siamo in fase di progettazione.",
      tech: ["Web app", "Lavoro di team"],
      stato: "in corso",
      media: [{ tipo: "img", src: null }]
    },
    {
      id: "seateasy",
      titolo: "SeatEasy",
      categoria: "web",
      etichetta: "Ristorazione",
      breve: "Prenotazioni e sala per ristoranti, sul modello di TheFork.",
      descrizione:
        "Piattaforma web per la ristorazione che gestisce clienti, prenotazioni e la disposizione dei tavoli in sala.",
      tech: ["Next.js", "TypeScript"],
      stato: "completato",
      media: [{ tipo: "img", src: null }]
    },
    {
      id: "onstagebari",
      titolo: "OnStageBari",
      categoria: "giochi",
      etichetta: "Serious game",
      breve: "Un serious game per i teatri di Bari.",
      descrizione:
        "Progettazione di un serious game dedicato ai teatri di Bari, per avvicinare il pubblico alla scena locale attraverso il gioco.",
      tech: ["React", "TypeScript"],
      stato: "completato",
      media: [{ tipo: "img", src: null }]
    }
  ],

  // voto/max servono all'anello animato. Se un percorso non ha voto, metti null.
  istruzione: [
    {
      periodo: "2026 → in corso",
      titolo: "Laurea magistrale in Computer Science: Artificial Intelligence",
      ente: "UNIBA · Università degli Studi di Bari",
      voto: null, max: null,
      dettagli: [],
      inCorso: true
    },
    {
      periodo: "2023 → 2026",
      titolo: "Laurea triennale in Informatica e Tecnologie per la Produzione del Software",
      ente: "UNIBA · Università degli Studi di Bari",
      voto: 105, max: 110,
      tesi: {
        titolo: "SerBot, assistente virtuale AI basato su RAG per la didattica universitaria",
        punti: [
          "Pipeline completa di importazione e recupero dei contenuti (ChromaDB, Voyage AI)",
          "Supporto a più LLM con valutazione comparativa",
          "Area docenti, quiz e gamification",
          "Stack: Next.js, React, TypeScript"
        ]
      },
      dettagli: []
    },
    {
      periodo: "2019 → 2023",
      titolo: "Diploma in Informatica",
      ente: "ITIS Vito Sante Longo · Monopoli (BA)",
      voto: 90, max: 100,
      dettagli: []
    }
  ],

  // Foto della laurea (pagina Istruzione)
  fotoLaurea: [
    { src: null, didascalia: "Proclamazione" },
    { src: null, didascalia: "Con la famiglia" },
    { src: null, didascalia: "Corona d'alloro" }
  ],

  competenze: [
    { gruppo: "Linguaggi", voci: ["Java", "C", "C++", "TypeScript", "JavaScript", "SQL"] },
    { gruppo: "Web", voci: ["HTML", "CSS", "React", "Next.js"] },
    { gruppo: "AI e LLM", voci: ["Sistemi RAG", "Integrazione e confronto di più LLM", "Embedding (Voyage AI)"] },
    { gruppo: "Database", voci: ["MySQL", "ChromaDB"] },
    { gruppo: "AI per il coding", voci: ["Claude Code", "Antigravity"] },
    { gruppo: "Strumenti", voci: ["VS Code", "Eclipse", "JUnit", "Figma", "Godot"] }
  ],

  lingue: [
    { lingua: "Italiano", livello: "Madrelingua", valore: 100 },
    { lingua: "Inglese", livello: "Intermedio", valore: 60 }
  ]
};
