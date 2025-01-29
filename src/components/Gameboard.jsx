import { useState } from "react";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function Gameboard() {
  const [prevGameboard, setGameboard] = useState(initialGameboard);

  function handleGameboardState(rowIndex, colIndex) {
    setGameboard(() => {
      // make deep copy of board
      const updatedGameboard = prevGameboard.map((innerArray) => [
        ...innerArray,
      ]);
      // update symbol on the UI tile
      updatedGameboard[rowIndex][colIndex] = "X";
      return updatedGameboard;
    });
  }

  return (
    <ol id="game-board">
      {prevGameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => handleGameboardState(rowIndex, colIndex)}
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
