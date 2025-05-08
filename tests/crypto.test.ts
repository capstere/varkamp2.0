import { vigenereDecrypt, sha256hex } from '../src/crypto';

describe('crypto.ts', () => {
  test('vigenereDecrypt decrypts correctly', () => {
    const cipher = 'ujvjs kfcej';
    const key = 'penta';
    // "ujvjs kfcej" → "pentagon"
    expect(vigenereDecrypt(cipher, key)).toBe('pentagon');
  });

  test('sha256hex produces correct hash for "pentagon"', async () => {
    const hash = await sha256hex('pentagon');
    expect(hash).toBe('ecc7dcf5bc2d51ebc4d9a9c9108443e3e2b035c0e167594a63ff2fde9a9cea98');
  });
});
