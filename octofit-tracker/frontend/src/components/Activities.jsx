import { useEffect, useState } from 'react'
import { fetchList } from '../api.js'

// Requires VITE_CODESPACE_NAME to be defined (for example in .env.local).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const ACTIVITIES_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchList(ACTIVITIES_ENDPOINT)
      .then((data) => {
        if (!ignore) setActivities(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">Failed to load activities: {error}</div>
  }

  return (
    <div>
      <h2>Activities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories</th>
            <th>Completed At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id}>
              <td>{activity.user?.displayName ?? activity.user}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>{activity.calories}</td>
              <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
