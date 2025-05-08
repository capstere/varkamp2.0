export interface PuzzleUIOptions {
  prompt: string;
  renderInteraction?: (container: HTMLElement) => void;
  renderInput?: (inputEl: HTMLInputElement) => void;
  validate: (answer: string) => boolean | Promise<boolean>;
  onSuccess(): void;
}

export function renderPuzzleUI(opts: PuzzleUIOptions) {
  const app = document.getElementById('app')!;
  app.innerHTML = '';
  // Prompt
  const sect = document.createElement('section');
  const p = document.createElement('div');
  p.className = 'prompt';
  p.textContent = opts.prompt;
  sect.appendChild(p);
  // Interaction container
  const inter = document.createElement('div');
  inter.className = 'interaction';
  sect.appendChild(inter);
  // Custom interaction (canvas, audio‑reverse, blend, maze…)
  if (opts.renderInteraction) opts.renderInteraction(inter);
  // Text-input
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Ditt svar här';
  inter.appendChild(input);
  if (opts.renderInput) opts.renderInput(input);
  // Submit
  const btn = document.createElement('button');
  btn.textContent = 'Skicka';
  btn.addEventListener('click', async () => {
    const ans = input.value.trim().toLowerCase();
    const ok = await opts.validate(ans);
    if (ok) opts.onSuccess();
    else {
      btn.classList.add('shake');
      setTimeout(() => btn.classList.remove('shake'), 300);
    }
  });
  sect.appendChild(btn);
  app.appendChild(sect);
}