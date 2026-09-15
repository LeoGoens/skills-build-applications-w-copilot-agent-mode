import { useEffect, useState } from 'react'
import { fetchList } from '../api.js'

// Requires VITE_CODESPACE_NAME to be defined (for example in .env.local).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const TEAMS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchList(TEAMS_ENDPOINT)
      .then((data) => {
        if (!ignore) setTeams(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">Failed to load teams: {error}</div>
  }

  return (
    <div>
      <h2>Teams</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id}>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>{team.members?.length ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
