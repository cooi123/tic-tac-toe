import { useState } from "react";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Gameboard({ symbol, onSelectSquare }) {
  const [currentGameboard, setGameboard] = useState(initialGameboard);

  function handleGameboardState(rowIndex, colIndex) {
    setGameboard((prevGameboard) => {
      // make deep copy of previous board
      const updatedGameboard = prevGameboard.map((innerArray) => [
        ...innerArray,
      ]);
      // update symbol on the UI tile
      updatedGameboard[rowIndex][colIndex] = symbol;
      return updatedGameboard;
    });

    // every time a square is clicked on, React will recall Gameboard component, which will
    // in turn call onSelectSquare() function. This will switch the active players.
    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {currentGameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() =>
                    handleGameboardState(rowIndex, colIndex)
                  }
                >
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
