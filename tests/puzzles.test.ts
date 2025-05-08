import * as p1 from '../src/puzzles/puzzle1_vigenere';
import * as p2 from '../src/puzzles/puzzle2_stegano';
import * as p3 from '../src/puzzles/puzzle3_audio';
import * as p4 from '../src/puzzles/puzzle4_multiblend';
import * as p5 from '../src/puzzles/puzzle5_maze_captcha';

const puzzles = [p1, p2, p3, p4, p5];

describe('puzzle modules', () => {
  puzzles.forEach((mod, i) => {
    test(`puzzle${i+1} exports valid hash and runPuzzle`, () => {
      expect(typeof mod.hash).toBe('string');
      // SHA‑256‑hash är 64 hex-tecken
      expect(mod.hash).toMatch(/^[0-9a-f]{64}$/);
      expect(typeof mod.runPuzzle).toBe('function');
    });
  });
});
