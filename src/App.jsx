import Gameboard from "./components/Gameboard";
import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" isCross={true}/>
          <Player initialName="Player 2" isCross={false}/>
        </ol>
        <Gameboard/>
      </div>
      MOVES
    </main>
  );
}

export default App;
