export default function Square({ value, onClick, isWinning }) {
  return (
    <button
      onClick={onClick}
      className={`square ${isWinning ? 'winning' : ''} ${value ? 'filled' : ''}`}
    >
      <span className={`piece ${value === 'X' ? 'piece-x' : 'piece-o'}`}>
        {value}
      </span>
    </button>
  );
}