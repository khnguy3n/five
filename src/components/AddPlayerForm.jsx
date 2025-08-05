import {useState} from "react"
export default function AddPlayerForm({ onAdd }){
  const [name, setName] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd(name.trim())
      setName("")
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1em" }}>
      <input
        className="input"
        type="text"
        placeholder="Enter player name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit" className="btn btn-xl btn-primary">
        Add Player
      </button>
    </form>
  )
}
