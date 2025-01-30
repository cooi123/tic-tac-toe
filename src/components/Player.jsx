import { useState } from "react";

export default function Player({ initialName, symbol, isActivePlayer, onSaveClick}) {
  // hook for state managing the current/updated playername
  const [playerName, setPlayerName] = useState(initialName);
  // hook for state managing 'edit'/'save' output
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClick() {
    // always use a function to change state when new state depends on previous state
    setIsEditing((isEditing) => !isEditing);

    // transfer new player name data to App component
    if (isEditing){
      onSaveClick(symbol, playerName);
    }
    
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActivePlayer ? 'active' : undefined }>
      <span className="player">
        {isEditing ? (
          <input
            type="text"
            required
            value={playerName}
            onChange={handleChange}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
