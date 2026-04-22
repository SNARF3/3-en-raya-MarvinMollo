// src/tests/tictactoe.test.js
import { describe, it, expect } from 'vitest';
import {
  createBoard,
  placePiece,
  getNextPlayer,
  checkWinner,
  PLAYERS,
} from '../game/tictactoe';

describe('R1 [MANUAL] - Colocación de piezas', () => {
  it('lanza excepción cuando la posición ya está ocupada', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R1 MANUAL — Posición ya ocupada             ║');
    console.log('╚══════════════════════════════════════════════╝');

    const board = createBoard();
    const board2 = placePiece(board, 1, 1, PLAYERS.X);

    console.log('\n  board2[1][1] =', board2[1][1]);
    console.log('  ➜ Intentando colocar "+" en (1,1) — celda ya ocupada...');

    let errorCapturado = '';
    try {
      placePiece(board2, 1, 1, PLAYERS.O);
    } catch (e) {
      errorCapturado = e.message;
      console.log('  ✅ Excepción capturada:', `"${e.message}"`);
    }

    console.log('\n  Esperado : mensaje contiene "ya ocupada"');
    console.log('  Obtenido :', `"${errorCapturado}"`);
    console.log('  ¿Pasa?   :', errorCapturado.includes('ya ocupada') ? '✅ PASS' : '❌ FAIL');
    console.log('─────────────────────────────────────────────\n');

    expect(errorCapturado).toContain('ya ocupada');
  });
});

describe('R2 [MANUAL] - Turnos', () => {
  it('el primer turno siempre es para X', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R2 MANUAL — Primer turno es X               ║');
    console.log('╚══════════════════════════════════════════════╝');

    const historial = [];
    console.log('\n  Historial:', historial, '(vacío — partida nueva)');
    console.log('  ➜ Llamando getNextPlayer([])...');

    const siguiente = getNextPlayer(historial);

    console.log('\n  Esperado : "X"');
    console.log('  Obtenido :', `"${siguiente}"`);
    console.log('  ¿Pasa?   :', siguiente === PLAYERS.X ? '✅ PASS' : '❌ FAIL');
    console.log('─────────────────────────────────────────────\n');

    expect(siguiente).toBe(PLAYERS.X);
  });
});

describe('R3 [MANUAL] - Condición de victoria', () => {
  it('X gana con una línea horizontal completa (fila 0)', () => {
    console.log('\n╔══════════════════════════════════════════════╗');
    console.log('║  R3 MANUAL — Victoria horizontal fila 0      ║');
    console.log('╚══════════════════════════════════════════════╝');

    const board = [
      ['X', 'X', 'X'],
      [null, '+', null],
      [null, null, null],
    ];

    console.log('\n  Tablero evaluado:');
    board.forEach((fila, i) => {
      console.log(`    Fila ${i}: [ ${fila.map(c => c ?? '·').join(' , ')} ]`);
    });

    console.log('\n  ➜ Llamando checkWinner(board)...');
    const ganador = checkWinner(board);

    console.log('\n  Esperado : "X"');
    console.log('  Obtenido :', `"${ganador}"`);
    console.log('  ¿Pasa?   :', ganador === 'X' ? '✅ PASS' : '❌ FAIL');
    console.log('─────────────────────────────────────────────\n');

    expect(ganador).toBe('X');
  });
});