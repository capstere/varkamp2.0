import { renderPuzzleUI } from '../uiHelpers';
import { sha256hex } from '../crypto';
import { generateCaptcha } from '../captcha';

export const hash = 'YOUR_HASH_HERE'; // SHA256("helmet")

function makeMaze(n: number): any { /* som tidigare backtracker */ }
function drawMaze(ctx: CanvasRenderingContext2D, maze: any, size: number) { /*…*/ }

export async function runPuzzle({ onSuccess }: { onSuccess(): void }) {
  let solved = false;
  let correctCaptcha = '';
  renderPuzzleUI({
    prompt: 'Gåta 5: Lös labyrinten, skanna QR och ange ordet + captcha',
    renderInteraction: container => {
      // Maze
      const c = document.createElement('canvas');
      const size = 15, cell = 20;
      c.width = size*cell; c.height = size*cell;
      container.appendChild(c);
      const maze = makeMaze(size);
      drawMaze(c.getContext('2d')!, maze, cell);
      // onSuccess-lås först
      const input = container.querySelector('input') as HTMLInputElement;
      input.disabled = true;
      // pekrörelser…
      c.addEventListener('pointerdown', e => { /* start */ });
      c.addEventListener('pointermove', e => {
        /* track, vid mål: */
        solved = true;
        // visa QR
        const qr = document.createElement('div');
        qr.id = 'qrcode';
        container.appendChild(qr);
        new (window as any).QRCode(qr, { text: 'helmet', width:150, height:150 });
        // captcha
        correctCaptcha = generateCaptcha(container);
        input.disabled = false;
      });
    },
    validate: async answer => {
      const [ans, cap] = answer.split(',');
      return cap === correctCaptcha && (await sha256hex(ans.trim())) === hash;
    },
    onSuccess
  });
}