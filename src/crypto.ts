// SHA-256 via SubtleCrypto
export async function sha256hex(str: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2,'0')).join('');
}

// Vigenère-dekryptering
export function vigenereDecrypt(text: string, key: string): string {
  const a = 'a'.charCodeAt(0);
  return text.split('').map((ch, i) => {
    const c = ch.charCodeAt(0);
    if (c < a || c > a+25) return ch;
    const shift = key.charCodeAt(i % key.length) - a;
    return String.fromCharCode((c - a - shift + 26) % 26 + a);
  }).join('');
}