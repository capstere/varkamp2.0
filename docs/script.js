// Enkel plain‑JS‑version av din chiffer‑femkamp

const puzzles = [
  { prompt: 'Gåta 1: Vigenère – avkryptera “ujvjs kfcej” med nyckeln PENTA', answer: 'pentagon' },
  { prompt: 'Gåta 2: Steno – tryck på bilden för att se texten', answer: 'secret' },
  { prompt: 'Gåta 3: Audio reverse – vilket ord hör du?', answer: 'spear' },
  { prompt: 'Gåta 4: Blend – klicka fyra gånger för att visa AXE123', answer: 'axe123' },
  { prompt: 'Gåta 5: QR – scanna och skriv ordet “helmet”', answer: 'helmet' }
];

let current = 0, startTime;

function init() {
  document.getElementById('app').innerHTML = `
    <section>
      <p>Välkommen! Lös fem gåtor i mobilen. Viska lösen till domaren.</p>
      <button id="start">Starta tävling</button>
    </section>`;
  document.getElementById('start').onclick = () => {
    startTime = Date.now();
    setInterval(updateTimer, 500);
    showPuzzle(0);
  };
}

function updateTimer() {
  const diff = Date.now() - startTime;
  const mm = String(Math.floor(diff / 60000)).padStart(2,'0');
  const ss = String(Math.floor((diff % 60000)/1000)).padStart(2,'0');
  document.getElementById('timer').textContent = `${mm}:${ss}`;
}

function showPuzzle(i) {
  if (i >= puzzles.length) {
    document.body.innerHTML = `<h2>Grattis!</h2><p>Slutlösenordet är: <strong>XYZ123</strong></p>`;
    return;
  }
  const p = puzzles[i];
  document.getElementById('app').innerHTML = `
    <section>
      <div class="prompt">${p.prompt}</div>
      <input id="ans" type="text" placeholder="Svar här">
      <button id="send">Skicka</button>
    </section>`;
  document.getElementById('send').onclick = () => {
    const ans = document.getElementById('ans').value.trim().toLowerCase();
    if (ans === p.answer) showPuzzle(i+1);
    else alert('Fel – försök igen!');
  };
}

window.onload = init;
