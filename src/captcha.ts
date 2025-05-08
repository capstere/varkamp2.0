export function generateCaptcha(parent: HTMLElement): string {
  const a = Math.floor(Math.random()*90)+10;
  const b = Math.floor(Math.random()*90)+10;
  const sum = (a+b).toString();
  const p = document.createElement('p');
  p.textContent = `Captcha: Vad är ${a} + ${b}? Svara som "ord,captcha".`;
  parent.appendChild(p);
  return sum;
}