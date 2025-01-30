import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function deriveActivePlayerSymbol(gameTurns) {
  let currentPlayerSymbol = "X";
  // empty turns array means that game has not started. First player is always X.
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayerSymbol = "O";
  }

  return currentPlayerSymbol;
}

function deriveWinner(gameboard, playerNames) {
  let winner;

  // check if a player has won after every turn
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameboard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameboard(gameTurns) {
  const gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  // update the state of the gameboard
  for (const { cell, player } of gameTurns) {
    const { row, col } = cell;

    // cannot override a taken slot on the board
    if (!gameboard[row][col]) {
      gameboard[row][col] = player;
    }
  }

  return gameboard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  // track player names for personalized Game Over message
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const activePlayer = deriveActivePlayerSymbol(gameTurns);

  const gameboard = deriveGameboard(gameTurns);

  // check for winner
  const winner = deriveWinner(gameboard, playerNames);

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleOnRematch() {
    setGameTurns(() => []);
  }

  function onPlayerNameChange(symbol, newName) {
    setPlayerNames((prevNames) => ({ ...prevNames, [symbol]: newName }));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName= {PLAYERS.X}
            symbol="X"
            isActivePlayer={activePlayer === "X"}
            onSaveClick={onPlayerNameChange}
          />
          <Player
            initialName= {PLAYERS.O}
            symbol="O"
            isActivePlayer={activePlayer === "O"}
            onSaveClick={onPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleOnRematch} />
        )}
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
