// src/components/GameStatus.jsx
export default function GameStatus({ winner, isDraw, currentPlayer }) {
  if (winner) return (
    <div className="status status-win">
      🏆 Ganó el jugador <strong>{winner}</strong>
    </div>
  );
  if (isDraw) return (
    <div className="status status-draw">🤝 ¡Empate!</div>
  );
  return (
    <div className="status status-turn">
      Turno de{' '}
      <span className={`player-badge ${currentPlayer === 'X' ? 'badge-x' : 'badge-o'}`}>
        {currentPlayer}
      </span>
    </div>
  );
}