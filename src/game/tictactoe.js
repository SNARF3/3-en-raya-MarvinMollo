// src/game/tictactoe.js

export const PLAYERS = { X: 'X', O: '+' };
export const BOARD_SIZE = 3;

export function createBoard() {
  return Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null));
}

export function placePiece(board, row, col, player) {
  if (row < 0 || row >= BOARD_SIZE) {
    throw new Error('Posición fuera del eje X');
  }
  if (col < 0 || col >= BOARD_SIZE) {
    throw new Error('Posición fuera del eje Y');
  }
  if (board[row][col] !== null) {
    throw new Error('Posición ya ocupada');
  }
  const newBoard = board.map(r => [...r]);
  newBoard[row][col] = player;
  return newBoard;
}

export function getNextPlayer(history) {
  if (history.length === 0) return PLAYERS.X;
  const last = history[history.length - 1];
  return last === PLAYERS.X ? PLAYERS.O : PLAYERS.X;
}

export function checkWinner(board) {
  for (let r = 0; r < BOARD_SIZE; r++) {
    if (board[r][0] && board[r].every(cell => cell === board[r][0])) return board[r][0];
  }
  for (let c = 0; c < BOARD_SIZE; c++) {
    if (board[0][c] && board.every(row => row[c] === board[0][c])) return board[0][c];
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) return board[0][0];
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) return board[0][2];
  return null;
}

export function isDraw(board) {
  return board.every(row => row.every(cell => cell !== null)) && !checkWinner(board);
}