import { useEffect, useState } from 'react'
import { fetchList } from '../api.js'

// Requires VITE_CODESPACE_NAME to be defined (for example in .env.local).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const USERS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchList(USERS_ENDPOINT)
      .then((data) => {
        if (!ignore) setUsers(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">Failed to load users: {error}</div>
  }

  return (
    <div>
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Display Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
