import { useEffect, useState } from 'react'
import { fetchList } from '../api.js'

// Requires VITE_CODESPACE_NAME to be defined (for example in .env.local).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const LEADERBOARD_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchList(LEADERBOARD_ENDPOINT)
      .then((data) => {
        if (!ignore) setEntries(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">Failed to load leaderboard: {error}</div>
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry._id}>
              <td>{index + 1}</td>
              <td>{entry.user?.displayName ?? entry.user}</td>
              <td>{entry.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
