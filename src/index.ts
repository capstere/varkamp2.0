import { initTimer } from './timer';
import { loadProgress, saveProgress, resetProgress } from './storage';
import { renderIntro, renderFinal } from './ui';
import { puzzles } from './puzzles/puzzle1_vigenere'; // samlar alla imports
import './serviceWorker';

async function main() {
  const progress = loadProgress();
  if (!progress.started) {
    renderIntro(async () => {
      saveProgress({ started: true, startTime: Date.now(), current: 0 });
      initTimer();
      await loadPuzzle(0);
    });
  } else if (progress.current >= puzzles.length) {
    initTimer(progress.startTime);
    renderFinal(computeFinalCode());
  } else {
    initTimer(progress.startTime);
    await loadPuzzle(progress.current);
  }
}

async function loadPuzzle(idx: number) {
  const puzzleModule = await import(`./puzzles/puzzle${idx+1}_*.ts`);
  await puzzleModule.runPuzzle({
    onSuccess: () => {
      const next = idx + 1;
      saveProgress({ current: next });
      if (next < puzzles.length) loadPuzzle(next);
      else renderFinal(computeFinalCode());
    }
  });
}

function computeFinalCode(): string {
  // kombinera hashar + SHA256, ta 8 tecken
  const combined = puzzles.map(p => p.hash).join('');
  return window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(combined))
    .then(buf => Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2,'0')).join('').slice(0,8));
}

main();
