
import { describe, it, expect } from 'vitest';
import {
  createBoard,
  placePiece,
  getNextPlayer,
  checkWinner,
  PLAYERS,
} from '../game/tictactoe';

// ══════════════════════════════════════════════
// REQUERIMIENTO 1 — Colocación de piezas
// ══════════════════════════════════════════════
describe('R1 [IA] - Colocación de piezas', () => {

  it('placePiece no muta el tablero original', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R1 IA — Inmutabilidad del tablero           ║');
    console.log('╚══════════════════════════════════════════════╝');

    const board = createBoard();
    console.log('\n  Tablero creado con createBoard()');
    console.log('  board[0][0] ANTES de placePiece:', board[0][0]);

    console.log('  ➜ Llamando placePiece(board, 0, 0, X) sin guardar el retorno...');
    placePiece(board, 0, 0, PLAYERS.X);

    console.log('  board[0][0] DESPUÉS de placePiece:', board[0][0]);
    console.log('\n  Esperado : null (el original NO debe cambiar)');
    console.log('  Obtenido :', board[0][0]);
    console.log('  ¿Pasa?   :', board[0][0] === null ? '✅ PASS — no hubo mutación' : '❌ FAIL — tablero mutado');
    console.log('─────────────────────────────────────────────\n');

    expect(board[0][0]).toBeNull();
  });

});

// ══════════════════════════════════════════════
// REQUERIMIENTO 2 — Turnos
// ══════════════════════════════════════════════
describe('R2 [IA] - Turnos', () => {

  it('alterna correctamente en una secuencia larga de 4 turnos', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R2 IA — Alternancia en secuencia larga      ║');
    console.log('╚══════════════════════════════════════════════╝');

    const historial = [PLAYERS.X, PLAYERS.O, PLAYERS.X, PLAYERS.O];
    console.log('\n  Historial:', historial);
    console.log('  Total de turnos jugados:', historial.length);
    console.log('  Turno número a jugar:', historial.length + 1);
    console.log('  ➜ Llamando getNextPlayer(historial)...');

    const siguiente = getNextPlayer(historial);

    console.log('\n  Esperado : "X" (turno 5, el ciclo vuelve a X)');
    console.log('  Obtenido :', `"${siguiente}"`);
    console.log('  ¿Pasa?   :', siguiente === PLAYERS.X ? '✅ PASS' : '❌ FAIL');
    console.log('─────────────────────────────────────────────\n');

    expect(siguiente).toBe(PLAYERS.X);
  });

});

// ══════════════════════════════════════════════
// REQUERIMIENTO 3 — Condición de victoria
// ══════════════════════════════════════════════
describe('R3 [IA] - Condición de victoria', () => {

  it('detecta victoria en las 3 columnas posibles (loop)', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R3 IA — Victoria vertical en 3 columnas     ║');
    console.log('╚══════════════════════════════════════════════╝');
    console.log('');

    [0, 1, 2].forEach(col => {
      const board = createBoard();
      board[0][col] = PLAYERS.O;
      board[1][col] = PLAYERS.O;
      board[2][col] = PLAYERS.O;

      console.log(`  Tablero columna ${col}:`);
      board.forEach((fila, i) => {
        console.log(`    Fila ${i}: [ ${fila.map(c => c ?? '·').join(' , ')} ]`);
      });

      const ganador = checkWinner(board);
      const ok = ganador === PLAYERS.O;

      console.log(`  ➜ checkWinner() → "${ganador}"`);
      console.log(`  ¿Pasa?   : ${ok ? '✅ PASS — columna ' + col + ' detectada' : '❌ FAIL'}`);
      console.log('');

      expect(ganador).toBe(PLAYERS.O);
    });

    console.log('─────────────────────────────────────────────\n');
  });

});
