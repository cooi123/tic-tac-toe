import Gameboard from "./components/Gameboard";
import Player from "./components/Player";
import { useState } from "react";

function App() {

  const [activePlayerSymbol, setActivePlayerSymbol] = useState('X');

  function handleOnSelectSquare(){
    setActivePlayerSymbol((prevPlayerSymbol) =>(prevPlayerSymbol === 'X'? 'O' : 'X'));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" isCross={true} isActivePlayer={activePlayerSymbol === 'X'}/>
          <Player initialName="Player 2" isCross={false} isActivePlayer={activePlayerSymbol === 'O'}/>
        </ol>
        <Gameboard symbol={activePlayerSymbol} onSelectSquare = {handleOnSelectSquare}/>
      </div>
      MOVES
    </main>
  );
}

export default App;
