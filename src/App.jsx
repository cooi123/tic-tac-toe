import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";

function deriveActivePlayerSymbol(gameTurns) {
  let currentPlayerSymbol = "X";
  // empty turns array means that game has not started. First player is always X.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayerSymbol = "O";
  }

  return currentPlayerSymbol;
}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayerSymbol(gameTurns);

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
            isActivePlayer={ activePlayer=== "O"}
          />
        </ol>
        <Gameboard turns={gameTurns} onSelectSquare={handleOnSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
