import { renderPuzzleUI } from '../uiHelpers';
import { sha256hex } from '../crypto';

export const hash = 'YOUR_HASH_HERE'; // SHA256("steganogram")

function embedLSB(canvas: HTMLCanvasElement, message: string) {
  const ctx = canvas.getContext('2d')!;
  // rita en enkel bild
  ctx.fillStyle = '#ddd'; ctx.fillRect(0,0,canvas.width,canvas.height);
  // embed varje tecken i red-kanalns LSB
  const data = ctx.getImageData(0,0,canvas.width,canvas.height);
  const msg = Array.from(message).map(c=>c.charCodeAt(0));
  for(let i=0;i<msg.length;i++){
    data.data[i*4] = (data.data[i*4] & 0xFE) | ((msg[i] >> 0) & 1);
  }
  ctx.putImageData(data,0,0);
}

function extractLSB(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext('2d')!;
  const data = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  const codes: number[] = [];
  for(let i=0;i<canvas.width;i++){
    const bit = data[i*4] & 1;
    codes.push(bit);
    if (codes.length === 8) break;
  }
  // enkel: 8 bitar → tecken
  return String.fromCharCode(parseInt(codes.join(''),2));
}

export async function runPuzzle({ onSuccess }: { onSuccess(): void }) {
  renderPuzzleUI({
    prompt: 'Gåta 2: Steganografi – hitta det dolda ordet i bilden',
    renderInteraction: container => {
      const c = document.createElement('canvas');
      c.width = 200; c.height = 50;
      container.appendChild(c);
      embedLSB(c, 'secret');
      // knapp för att extrahera
      const btn = document.createElement('button');
      btn.textContent = 'Visa dolt meddelande';
      btn.addEventListener('click', () => {
        const msg = extractLSB(c);
        alert(`Dolt ord: ${msg}`);
      });
      container.appendChild(btn);
    },
    validate: async answer => (await sha256hex(answer)) === hash,
    onSuccess
  });
}