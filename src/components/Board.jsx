import Square from './Square';

export default function Board({ board, onSquareClick, winningCells }) {
  const isWinning = (r, c) =>
    winningCells?.some(([wr, wc]) => wr === r && wc === c);

  return (
    <div className="board">
      {board.map((row, r) =>
        row.map((cell, c) => (
          <Square
            key={`${r}-${c}`}
            value={cell}
            onClick={() => onSquareClick(r, c)}
            isWinning={isWinning(r, c)}
          />
        ))
      )}
    </div>
  );
}