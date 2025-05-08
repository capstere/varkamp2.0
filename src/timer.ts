let startTime: number;
let intervalId: number;

export function initTimer(stored?: number) {
  startTime = stored ?? Date.now();
  update();
  intervalId = window.setInterval(update, 500);
}

function update() {
  const diff = Date.now() - startTime;
  const mm = String(Math.floor(diff/60000)).padStart(2,'0');
  const ss = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
  document.getElementById('timer')!.textContent = `${mm}:${ss}`;
}

export function stopTimer() {
  clearInterval(intervalId);
}
