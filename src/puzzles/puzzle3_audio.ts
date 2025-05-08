import { renderPuzzleUI } from '../uiHelpers';
import { sha256hex } from '../crypto';

export const hash = 'YOUR_HASH_HERE'; // SHA256("spear")

export async function runPuzzle({ onSuccess }: { onSuccess(): void }) {
  renderPuzzleUI({
    prompt: 'Gåta 3: Spela refräng baklänges och pitch‑skiftad – vilket ord hör du?',
    renderInteraction: container => {
      fetch('assets/p3-chorus-rev.mp3')
        .then(r => r.arrayBuffer())
        .then(buf => {
          const ac = new AudioContext();
          return ac.decodeAudioData(buf).then(decoded => {
            // pitch‑shift
            const rate = 1.2;
            const btnPlay = document.createElement('button');
            btnPlay.textContent = 'Spela igen';
            btnPlay.addEventListener('click', () => {
              const src = ac.createBufferSource();
              src.buffer = decoded;
              src.playbackRate.value = rate;
              src.connect(ac.destination);
              src.start();
            });
            container.appendChild(btnPlay);
            // autoplay första gången
            btnPlay.click();
          });
        });
    },
    validate: async answer => (await sha256hex(answer)) === hash,
    onSuccess
  });
}