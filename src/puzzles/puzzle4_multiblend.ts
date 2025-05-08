import { renderPuzzleUI } from '../uiHelpers';
import { sha256hex } from '../crypto';

export const hash = 'YOUR_HASH_HERE'; // SHA256("axe123")

export async function runPuzzle({ onSuccess }: { onSuccess(): void }) {
  renderPuzzleUI({
    prompt: 'Gåta 4: Klicka blend‑sekvens (4 steg) för att avslöja koden',
    renderInteraction: container => {
      const modes = ['multiply','screen','overlay','difference'];
      const order = [2,0,3,1]; // exempelordning
      let step = 0;
      const layers: HTMLDivElement[] = [];
      const wrapper = document.createElement('div');
      wrapper.className = 'blend-container';
      container.appendChild(wrapper);
      // layer
      ['#f00','#0f0','#00f','#ff0'].forEach(col => {
        const d = document.createElement('div');
        d.className = 'blend-layer';
        d.style.background = col;
        wrapper.appendChild(d);
        layers.push(d);
      });
      const text = document.createElement('div');
      text.className = 'blend-text';
      text.textContent = 'AXE123';
      wrapper.appendChild(text);
      const btn = document.createElement('button');
      btn.textContent = 'Nästa steg';
      container.appendChild(btn);
      btn.addEventListener('click', () => {
        const idx = order[step];
        layers.forEach(l => l.style.mixBlendMode = modes[idx]);
        step++;
        if (step===order.length) text.style.opacity='1';
      });
    },
    validate: async answer => (await sha256hex(answer)) === hash,
    onSuccess
  });
}