import { useState } from "react";
import CreateGame from "./CreateGame";
import PlayGame from "./PlayGame";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState();

  return (
    <div className="">
      {isPlaying ? (
        <PlayGame
          gameData={gameState}
          reset={() => {
            setIsPlaying(false);
            setGameState(null);
          }}
        />
      ) : (
        <CreateGame
          play={(newState) => {
            setIsPlaying(true);
            setGameState(newState);
          }}
        />
      )}
    </div>
  );
}

export default App;
