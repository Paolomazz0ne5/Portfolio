# Portfolio di Paolo Mazzone (bozza)

Sito statico in **HTML, CSS e JavaScript puro**: niente framework, niente build.
Per vederlo basta aprire `index.html` con un doppio clic.

## Struttura delle cartelle

```
portfolio/
├── index.html          scheletro della pagina: menu, le 4 sezioni vuote, la modale
├── css/
│   └── style.css       tutto l'aspetto (colori, font, animazioni), diviso in 9 blocchi numerati
├── js/
│   ├── data.js         TUTTI i contenuti (testi, progetti, voti, percorsi delle foto)
│   ├── background.js   sfondo a particelle su <canvas>
│   ├── cursor.js       cursore circolare che insegue il mouse
│   ├── router.js       passaggio tra le pagine (#home, #progetti, ...)
│   ├── carousel.js     carosello foto della home (+ funzione creaVuoto per i segnaposto)
│   ├── home.js         nome glitch, scritta che si digita da sola, contatori
│   ├── projects.js     schede progetti, filtri, effetto 3D, finestra di dettaglio
│   ├── education.js    timeline dell'istruzione, anelli dei voti, foto di laurea
│   ├── skills.js       orbita animata + elenco competenze e lingue
│   └── main.js         avvia tutti i componenti nell'ordine giusto
└── assets/
    └── img/            foto (per ora c'è solo quella del CV)
```

## L'idea generale

1. **I contenuti stanno in un solo posto** (`js/data.js`). L'HTML ha le sezioni vuote;
   ogni componente JS legge i dati e crea l'HTML. Per aggiungere un progetto o una foto
   modifichi solo `data.js`.
2. **Una pagina sola, quattro "viste".** Le pagine sono `<section class="vista">` nello stesso
   file. `router.js` guarda il `#` nell'indirizzo e mostra quella giusta.
3. **Il movimento lo fa quasi sempre il CSS.** Il JavaScript cambia una classe
   (es. `.attiva`, `.attuale`) e il CSS anima il cambio con `transition` o `@keyframes`.
   Solo lo sfondo e il cursore sono animati in JS, fotogramma per fotogramma.

## I componenti, uno per uno

| File | Cosa fa | Concetto chiave da capire |
|---|---|---|
| `router.js` | Mostra la vista giusta, sposta la barretta luminosa nel menu, lancia l'evento `cambiovista` | evento `hashchange`, `CustomEvent` |
| `carousel.js` | Foto impilate; ognuna riceve la classe `attuale`, `prossima`, `precedente` o `nascosta`. Un timer avanza ogni 4 s, si ferma col mouse sopra, si scorre col dito | `setInterval`, operatore `%` per ricominciare da capo, `transform` 3D |
| `home.js` | Typer (scrive e cancella i ruoli), contatori da 0 a 105 | `setTimeout` ricorsivo, `requestAnimationFrame`, funzione di easing |
| `projects.js` | Crea schede e filtri; la scheda si inclina seguendo il mouse; al clic apre la modale | coordinate del mouse relative alla scheda, variabili CSS (`--mx`) impostate da JS |
| `education.js` | Timeline e anello del voto che si riempie | `stroke-dasharray` / `stroke-dashoffset` di un cerchio SVG |
| `skills.js` | Anelli che ruotano con le competenze sopra, poi l'elenco completo dal CV | posizioni su un cerchio con `cos` e `sin` |
| `background.js` | Particelle che si muovono, si collegano tra loro e verso il mouse | ciclo di animazione su canvas: cancella, aggiorna, ridisegna |
| `cursor.js` | Cerchio che insegue il mouse con ritardo | interpolazione: ogni fotogramma percorre il 20% della distanza |

Ogni file ha in cima un commento che spiega il suo funzionamento, e le righe meno ovvie
sono commentate.

## Cose da sapere

- **Ordine degli script** (in fondo a `index.html`): prima `data.js`, poi i componenti,
  per ultimo `main.js`. Il router va avviato per ultimo perché gli altri componenti
  devono già essere in ascolto dell'evento `cambiovista`.
- **Accessibilità**: chi ha attivato "riduci movimento" nel sistema operativo vede il sito
  senza animazioni (fondo di `style.css`).
- **Colori**: sono tutti variabili in cima a `style.css` (`--nero`, `--bianco`, `--segnale`...).

## Come aggiungere foto e video

1. Copia il file in `assets/img/` (o crea `assets/video/`).
2. In `data.js` sostituisci `src: null` con il percorso, es. `src: "assets/img/laurea-1.jpg"`.
3. Per i video usa `{ tipo: "video", src: "assets/video/serbot-demo.mp4" }`:
   nella scheda parte da solo, senza audio e in loop; nella finestra di dettaglio ha i controlli.
