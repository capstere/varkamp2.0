export interface Progress { started: boolean; startTime: number; current: number; }

const KEY = 'fk-progress';
export function loadProgress(): Progress {
  return JSON.parse(localStorage.getItem(KEY) || '{"started":false,"startTime":0,"current":0}');
}
export function saveProgress(upd: Partial<Progress>) {
  const prog = { ...loadProgress(), ...upd };
  localStorage.setItem(KEY, JSON.stringify(prog));
}
export function resetProgress() {
  localStorage.removeItem(KEY);
}