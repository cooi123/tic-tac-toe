import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayerSymbol, setActivePlayerSymbol] = useState("X");

  function handleOnSelectSquare(rowIndex, colIndex) {

    
    setActivePlayerSymbol((prevPlayerSymbol) =>
      prevPlayerSymbol === "X" ? "O" : "X"
    );

    // pass gameboard grid data to Gameboard and Log components
    setGameTurns((prevTurns) => {
      let currentPlayerSymbol = "X";
      // empty turns array means that game has not started. First player is always X.
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayerSymbol = "O";
      }
      const updatedTurns = [
        { cell: { row: rowIndex, col: colIndex }, player: currentPlayerSymbol },
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
            isActivePlayer={activePlayerSymbol === "X"}
          />
          <Player
            initialName="Player 2"
            isCross={false}
            isActivePlayer={activePlayerSymbol === "O"}
          />
        </ol>
        <Gameboard
          turns={gameTurns}
          onSelectSquare={handleOnSelectSquare}
        />
      </div>
      <Log turns = {gameTurns} />
    </main>
  );
}

export default App;
