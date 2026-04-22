import { useState } from 'react';
import {
    createBoard,
    placePiece,
    getNextPlayer,
    checkWinner,
    PLAYERS,
} from '../game/tictactoe';

function runAllTests() {
    const results = [];

    // ── R1 MANUAL ──────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'M-01', req: 'R1', tipo: 'MANUAL', nombre: 'Posición ya ocupada lanza excepción', logs, pass: false, esperado: 'Error con "ya ocupada"', obtenido: '' };
        try {
            const board = createBoard();
            const board2 = placePiece(board, 1, 1, PLAYERS.X);
            logs.push({ t: 'info', m: 'Tablero creado. X colocada en (1,1)' });
            logs.push({ t: 'info', m: `board2[1][1] = "${board2[1][1]}"` });
            logs.push({ t: 'info', m: 'Intentando colocar "+" en (1,1) — celda ocupada...' });
            let msg = '';
            try {
                placePiece(board2, 1, 1, PLAYERS.O);
                logs.push({ t: 'fail', m: 'No se lanzó ninguna excepción (inesperado)' });
            } catch (e) {
                msg = e.message;
                logs.push({ t: 'pass', m: `Excepción capturada: "${e.message}"` });
            }
            test.obtenido = `Error: "${msg}"`;
            test.pass = msg.includes('ya ocupada');
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `¿Contiene "ya ocupada"? → ${test.pass}` });
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error inesperado: ' + e.message });
        }
        results.push(test);
    })();

    // ── R1 IA ───────────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'IA-01', req: 'R1', tipo: 'IA', nombre: 'placePiece no muta el tablero original', logs, pass: false, esperado: 'board[0][0] === null', obtenido: '' };
        try {
            const board = createBoard();
            logs.push({ t: 'info', m: `board[0][0] ANTES: ${board[0][0]}` });
            logs.push({ t: 'info', m: 'Llamando placePiece(board, 0, 0, X) sin guardar retorno...' });
            placePiece(board, 0, 0, PLAYERS.X);
            logs.push({ t: 'info', m: `board[0][0] DESPUÉS: ${board[0][0]}` });
            test.pass = board[0][0] === null;
            test.obtenido = `board[0][0] = ${board[0][0]}`;
            logs.push({ t: test.pass ? 'pass' : 'fail', m: test.pass ? 'Sin mutación — tablero original intacto' : 'ERROR: tablero fue mutado' });
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error: ' + e.message });
        }
        results.push(test);
    })();

    // ── R2 MANUAL ──────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'M-02', req: 'R2', tipo: 'MANUAL', nombre: 'El primer turno siempre es de "X"', logs, pass: false, esperado: '"X"', obtenido: '' };
        try {
            const h = [];
            logs.push({ t: 'info', m: `Historial: [] (partida nueva)` });
            logs.push({ t: 'info', m: 'Llamando getNextPlayer([])...' });
            const sig = getNextPlayer(h);
            test.obtenido = `"${sig}"`;
            test.pass = sig === PLAYERS.X;
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `getNextPlayer([]) → "${sig}"` });
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `¿Es "X"? → ${test.pass}` });
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error: ' + e.message });
        }
        results.push(test);
    })();

    // ── R2 IA ───────────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'IA-02', req: 'R2', tipo: 'IA', nombre: 'Secuencia larga de 4 turnos alterna correctamente', logs, pass: false, esperado: '"X" (turno 5)', obtenido: '' };
        try {
            const h = [PLAYERS.X, PLAYERS.O, PLAYERS.X, PLAYERS.O];
            logs.push({ t: 'info', m: `Historial: [${h.join(', ')}]` });
            logs.push({ t: 'info', m: `Turno a jugar: ${h.length + 1}` });
            logs.push({ t: 'info', m: 'Llamando getNextPlayer(historial)...' });
            const sig = getNextPlayer(h);
            test.obtenido = `"${sig}"`;
            test.pass = sig === PLAYERS.X;
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `getNextPlayer([X,+,X,+]) → "${sig}"` });
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `¿Vuelve a X en turno 5? → ${test.pass}` });
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error: ' + e.message });
        }
        results.push(test);
    })();

    // ── R3 MANUAL ──────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'M-03', req: 'R3', tipo: 'MANUAL', nombre: 'X gana con línea horizontal completa (fila 0)', logs, pass: false, esperado: '"X"', obtenido: '' };
        try {
            const board = [['X', 'X', 'X'], [null, '+', null], [null, null, null]];
            logs.push({ t: 'info', m: 'Fila 0: [ X , X , X ]' });
            logs.push({ t: 'info', m: 'Fila 1: [ · , + , · ]' });
            logs.push({ t: 'info', m: 'Fila 2: [ · , · , · ]' });
            logs.push({ t: 'info', m: 'Llamando checkWinner(board)...' });
            const ganador = checkWinner(board);
            test.obtenido = `"${ganador}"`;
            test.pass = ganador === 'X';
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `checkWinner → "${ganador}"` });
            logs.push({ t: test.pass ? 'pass' : 'fail', m: `¿Es "X"? → ${test.pass}` });
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error: ' + e.message });
        }
        results.push(test);
    })();

    // ── R3 IA ───────────────────────────────────────────────────────────
    (() => {
        const logs = [];
        const test = { id: 'IA-03', req: 'R3', tipo: 'IA', nombre: 'Detecta victoria en las 3 columnas (loop)', logs, pass: false, esperado: '"+" en col 0, 1 y 2', obtenido: '' };
        try {
            let all = true;
            [0, 1, 2].forEach(col => {
                const board = createBoard();
                board[0][col] = PLAYERS.O;
                board[1][col] = PLAYERS.O;
                board[2][col] = PLAYERS.O;
                const ganador = checkWinner(board);
                const ok = ganador === PLAYERS.O;
                if (!ok) all = false;
                logs.push({ t: ok ? 'pass' : 'fail', m: `Columna ${col}: checkWinner → "${ganador}" ${ok ? '✓' : '✗'}` });
            });
            test.pass = all;
            test.obtenido = all ? 'Las 3 columnas detectadas' : 'Fallo en alguna columna';
        } catch (e) {
            logs.push({ t: 'fail', m: 'Error: ' + e.message });
        }
        results.push(test);
    })();

    return results;
}

const REQ_COLOR = { R1: '#ff4d6d', R2: '#4cc9f0', R3: '#ffd60a' };
const TIPO_STYLE = {
    MANUAL: { bg: '#0f2e1a', border: '#1a5e36', color: '#4cff8a', label: 'MANUAL' },
    IA: { bg: '#0a1a2e', border: '#1a3a6e', color: '#4cc9f0', label: 'IA' },
};

export default function TestResults() {
    const [results, setResults] = useState(null);
    const [running, setRunning] = useState(false);

    const run = () => {
        setRunning(true);
        setResults(null);
        setTimeout(() => {
            setResults(runAllTests());
            setRunning(false);
        }, 400);
    };

    const passed = results?.filter(r => r.pass).length ?? 0;
    const total = results?.length ?? 0;
    const allPass = passed === total && total > 0;

    return (
        <div style={{ width: '100%', maxWidth: 680, margin: '0 auto', padding: '1.5rem 1rem', fontFamily: "'Space Mono', monospace" }}>

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                    <div style={{ color: '#e8e8f0', fontWeight: 700, fontSize: '0.95rem', letterSpacing: 1 }}>
                        Pruebas Unitarias TDD
                    </div>
                    <div style={{ color: '#555', fontSize: '0.7rem', marginTop: 2 }}>
                        3 requerimientos · 1 manual + 1 IA cada uno
                    </div>
                </div>
                <button onClick={run} disabled={running} style={{
                    background: running ? '#1a1a1f' : '#2E75B6',
                    color: running ? '#555' : '#fff',
                    border: `1px solid ${running ? '#333' : '#2E75B6'}`,
                    borderRadius: 6, padding: '0.45rem 1.1rem',
                    cursor: running ? 'default' : 'pointer',
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.78rem', letterSpacing: 1, transition: 'all 0.2s',
                }}>
                    {running ? '⏳ ejecutando...' : '▶  correr tests'}
                </button>
            </div>

            {/* Summary bar */}
            {results && (
                <div style={{
                    background: allPass ? '#071a0f' : '#1a0707',
                    border: `1px solid ${allPass ? '#1a5e36' : '#5e1a1a'}`,
                    borderRadius: 8, padding: '0.75rem 1rem',
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    marginBottom: '1.2rem',
                }}>
                    <span style={{ fontSize: '1.2rem' }}>{allPass ? '✅' : '❌'}</span>
                    <div>
                        <div style={{ color: allPass ? '#4cff8a' : '#ff6b6b', fontWeight: 700, fontSize: '0.95rem' }}>
                            {passed} / {total} pruebas pasando
                        </div>
                        <div style={{ color: '#555', fontSize: '0.68rem', marginTop: 1 }}>
                            vitest --reporter=verbose · 6 it() · 3 describe() · 2 archivos
                        </div>
                    </div>
                </div>
            )}

            {/* Test cards */}
            {results && results.map(r => {
                const ts = TIPO_STYLE[r.tipo];
                const rc = REQ_COLOR[r.req];
                return (
                    <div key={r.id} style={{
                        background: '#0d0d0f',
                        border: `1px solid ${r.pass ? '#1a3a1a' : '#3a1a1a'}`,
                        borderRadius: 8, marginBottom: '0.9rem', overflow: 'hidden',
                    }}>
                        {/* Card header */}
                        <div style={{
                            background: r.pass ? '#071a0f' : '#1a0707',
                            padding: '0.6rem 1rem',
                            display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap',
                        }}>
                            <span style={{ fontSize: '0.9rem' }}>{r.pass ? '✅' : '❌'}</span>

                            <span style={{
                                background: rc + '18', color: rc,
                                border: `1px solid ${rc}44`,
                                borderRadius: 4, padding: '1px 7px', fontSize: '0.65rem', fontWeight: 700,
                            }}>{r.req}</span>

                            <span style={{
                                background: ts.bg, color: ts.color,
                                border: `1px solid ${ts.border}`,
                                borderRadius: 4, padding: '1px 7px', fontSize: '0.65rem', fontWeight: 700,
                            }}>{ts.label}</span>

                            <span style={{ color: '#ccc', fontSize: '0.78rem', flex: 1 }}>{r.nombre}</span>

                            <span style={{ color: '#333', fontSize: '0.65rem' }}>{r.id}</span>
                        </div>

                        {/* Console log area */}
                        <div style={{
                            background: '#060608',
                            borderTop: '1px solid #1a1a1f',
                            borderBottom: '1px solid #1a1a1f',
                            padding: '0.6rem 1rem',
                        }}>
                            <div style={{ color: '#333', fontSize: '0.6rem', marginBottom: 6, letterSpacing: 1 }}>
                                CONSOLE OUTPUT
                            </div>
                            {r.logs.map((l, i) => (
                                <div key={i} style={{
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: '0.75rem',
                                    color: l.t === 'pass' ? '#4cff8a' : l.t === 'fail' ? '#ff6b6b' : '#777',
                                    padding: '1px 0',
                                    paddingLeft: 10,
                                    borderLeft: `2px solid ${l.t === 'pass' ? '#1a5e36' : l.t === 'fail' ? '#5e1a1a' : '#1a1a2e'}`,
                                    marginBottom: 2,
                                }}>
                                    {l.t === 'pass' ? '  ✅ ' : l.t === 'fail' ? '  ❌ ' : '     '}{l.m}
                                </div>
                            ))}
                        </div>

                        {/* Expected vs Obtained */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                            <div style={{ padding: '0.6rem 1rem', borderRight: '1px solid #1a1a1f' }}>
                                <div style={{ color: '#333', fontSize: '0.6rem', marginBottom: 4, letterSpacing: 1 }}>ESPERADO</div>
                                <div style={{ color: '#4cc9f0', fontFamily: "'Courier New', monospace", fontSize: '0.78rem' }}>
                                    {r.esperado}
                                </div>
                            </div>
                            <div style={{ padding: '0.6rem 1rem' }}>
                                <div style={{ color: '#333', fontSize: '0.6rem', marginBottom: 4, letterSpacing: 1 }}>OBTENIDO</div>
                                <div style={{ color: r.pass ? '#4cff8a' : '#ff6b6b', fontFamily: "'Courier New', monospace", fontSize: '0.78rem' }}>
                                    {r.obtenido}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {!results && !running && (
                <div style={{ textAlign: 'center', color: '#333', padding: '3rem 0', fontSize: '0.8rem', letterSpacing: 1 }}>
                    presiona "correr tests" para ver los resultados
                </div>
            )}
        </div>
    );
}