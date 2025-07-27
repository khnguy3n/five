import React, { useState } from "react";
import './App.css'

function AddPlayerForm({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1em" }}>
      <input
        type="text"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
}

export default function App() {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});

  const addPlayer = (name) => {
    setPlayers([...players, name]);
    setScores({ ...scores, [name]: Array(11).fill(0) });
  };

  const removePlayer = (name) => {
    const updatedPlayers = players.filter(p => p !== name);
    const { [name]: _, ...updatedScores } = scores;
    setPlayers(updatedPlayers);
    setScores(updatedScores);
  };

  const updateScore = (player, round, value) => {
    const updated = [...scores[player]];
    updated[round] = Number(value);
    setScores({ ...scores, [player]: updated });
  };

  return (
    <div>
      <h1>Score Tracker</h1>
      <AddPlayerForm onAdd={addPlayer} />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            {players.map(player => (
              <th key={player}>
                {player}
                <button onClick={() => removePlayer(player)} style={{ marginLeft: '5px' }}>❌</button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 11 }, (_, roundIndex) => (
            <tr key={roundIndex}>
              <td>Round {roundIndex + 1}</td>
              {players.map(player => (
                <td key={player}>
<input
  type="number"
  value={scores[player]?.[roundIndex] || 0}
  onChange={(e) => updateScore(player, roundIndex, e.target.value)}
  style={{
    width: `${100 / (players.length + 1)}vw`,
    maxWidth: "100%",
    boxSizing: "border-box"
  }}
/>

                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td><strong>Total</strong></td>
            {players.map(player => (
              <td key={player}>
                <strong>{scores[player]?.reduce((a, b) => a + b, 0)}</strong>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
     </div>

    </div>
  );
}
