import { renderPuzzleUI } from '../uiHelpers';
import { vigenereDecrypt, sha256hex } from '../crypto';

export const hash = 'YOUR_HASH_HERE'; // SHA256("pentagon")

export async function runPuzzle({ onSuccess }: { onSuccess(): void }) {
  const cipher = 'ujvjs kfcej';
  const key = 'penta';
  renderPuzzleUI({
    prompt: `Gåta 1: Vigenère-chiffer – avkryptera “${cipher}” med nyckeln "${key.toUpperCase()}"`,
    validate: async answer => {
      const dec = vigenereDecrypt(cipher, key);
      return answer === dec && (await sha256hex(answer)) === hash;
    },
    onSuccess
  });
}