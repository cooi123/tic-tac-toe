const gameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Gameboard({ turns, onSelectSquare }) {
  // update the state of the gameboard
  for (const { cell, player } of turns) {
    const { row, col } = cell;
    gameboard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
