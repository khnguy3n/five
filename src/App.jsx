import { useState } from "react"
import "./App.css"
import AddPlayerForm from "components/AddPlayerForm"

export default function App() {
  const roundName = ["3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState({})

  const addPlayer = (name) => {
    setPlayers([...players, name])
    setScores({ ...scores, [name]: Array(11).fill(0) })
  }

  const removePlayer = (name) => {
    const updatedPlayers = players.filter((p) => p !== name)
    const { [name]: _, ...updatedScores } = scores
    setPlayers(updatedPlayers)
    setScores(updatedScores)
  }

  const updateScore = (player, round, value) => {
    const updated = [...scores[player]]
    updated[round] = Number(value)
    setScores({ ...scores, [player]: updated })
  }

  return (
    <div>
      <h1>5 👑</h1>
      <AddPlayerForm onAdd={addPlayer} />
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table sticky top-0">
          <thead className="sticky top-0 bg-base-100 z-[1]">
            <tr>
              <th className="bg-base-100">Rounds</th>
              {players.map((player) => (
                <td key={player}>
                  <div className="text-center">{player}</div>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 11 }, (_, roundIndex) => (
              <tr key={roundIndex}>
                <td>Round {roundName[roundIndex]}</td>
                {players.map((player) => (
                  <td key={player}>
                    <input
                      type="number"
                      className="input input-accent input-lg"
                      onBlur={(e) =>
                        updateScore(player, roundIndex, e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.target.blur()
                        }
                      }}
                      style={{
                        width: `${100 / (players.length + 2)}vw`,
                        maxWidth: "100%",
                        boxSizing: "border-box",
                      }}
                    />
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              {players.map((player) => (
                <td key={player} className="text-center">
                  <strong>{scores[player]?.reduce((a, b) => a + b, 0)}</strong>
                </td>
              ))}
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Round</th>
              {players.map((player) => (
                <th key={player}>
                  <button
                    type="button"
                    onClick={() => removePlayer(player)}
                    className="btn btn-outline btn-error btn-block"
                  >
                    ❌
                  </button>
                  <div className="text-center">{player}</div>
                </th>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
