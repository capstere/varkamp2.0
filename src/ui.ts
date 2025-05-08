type Callback = () => void;

export function renderIntro(onStart: Callback) {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <section id="intro">
      <p>Välkommen…</p>
      <button id="start-btn">Starta tävlingen</button>
    </section>`;
  document.getElementById('start-btn')!
    .addEventListener('click', onStart);
}

export function renderFinal(code: string) {
  document.body.innerHTML = `
    <section>
      <h2>Grattis!</h2>
      <p>Slutlösenordet är: <strong>${code}</strong></p>
    </section>`;
}
