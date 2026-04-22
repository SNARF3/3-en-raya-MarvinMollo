// src/components/GameBoard.jsx
import { useState } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import { createBoard, placePiece, getNextPlayer, checkWinner, isDraw } from '../game/tictactoe';

function getWinningCells(board) {
  const lines = [
    [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]], [[0, 2], [1, 1], [2, 0]],
  ];
  for (const line of lines) {
    const [[r0, c0], [r1, c1], [r2, c2]] = line;
    if (board[r0][c0] && board[r0][c0] === board[r1][c1] && board[r1][c1] === board[r2][c2]) return line;
  }
  return null;
}

export default function GameBoard() {
  const [board, setBoard] = useState(createBoard());
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const winner = checkWinner(board);
  const draw = isDraw(board);
  const currentPlayer = getNextPlayer(history);
  const winningCells = winner ? getWinningCells(board) : null;

  const handleClick = (r, c) => {
    if (winner || draw) return;
    try {
      const newBoard = placePiece(board, r, c, currentPlayer);
      setBoard(newBoard);
      setHistory([...history, currentPlayer]);
      setError(null);
    } catch (e) {
      setError(e.message);
    }
  };

  const reset = () => {
    setBoard(createBoard());
    setHistory([]);
    setError(null);
  };

  return (
    <div className="game-container">
      <h1 className="game-title">Tres en Raya</h1>
      <GameStatus winner={winner} isDraw={draw} currentPlayer={currentPlayer} />
      {error && <div className="error-msg">⚠️ {error}</div>}
      <Board board={board} onSquareClick={handleClick} winningCells={winningCells} />
      <button className="reset-btn" onClick={reset}>Nueva Partida</button>
    </div>
  );
}