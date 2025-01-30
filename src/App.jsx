import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver";

function deriveActivePlayerSymbol(gameTurns) {
  let currentPlayerSymbol = "X";
  // empty turns array means that game has not started. First player is always X.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayerSymbol = "O";
  }

  return currentPlayerSymbol;
}

const gameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayerSymbol(gameTurns);

  // update the state of the gameboard
  for (const { cell, player } of gameTurns) {
    const { row, col } = cell;

    // cannot override a taken slot on the board
    if (!gameboard[row][col]) {
      gameboard[row][col] = player;
    }
  }

  let winner;

  // check if a player has won after every turn
  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column];

    if ( firstSquareSymbol && firstSquareSymbol === secondSquareSymbol  && secondSquareSymbol ===thirdSquareSymbol){
        winner = firstSquareSymbol;
    }
    
  }

  function handleOnSelectSquare(rowIndex, colIndex) {
    // update gameboard grid data so they can be passed to Gameboard and Log components
    setGameTurns((prevTurns) => {
      const activePlayerSymbol = deriveActivePlayerSymbol(prevTurns);
      const updatedTurns = [
        { cell: { row: rowIndex, col: colIndex }, player: activePlayerSymbol },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            isCross={true}
            isActivePlayer={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            isCross={false}
            isActivePlayer={activePlayer === "O"}
          />
        </ol>
        {winner && <GameOver winner = {winner} />}
        <Gameboard
          gameboard={gameboard}
          onSelectSquare={handleOnSelectSquare}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
