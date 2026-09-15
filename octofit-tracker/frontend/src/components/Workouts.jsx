import { useEffect, useState } from 'react'
import { fetchList } from '../api.js'

// Requires VITE_CODESPACE_NAME to be defined (for example in .env.local).
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const WORKOUTS_ENDPOINT = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    fetchList(WORKOUTS_ENDPOINT)
      .then((data) => {
        if (!ignore) setWorkouts(data)
      })
      .catch((err) => {
        if (!ignore) setError(err.message)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (error) {
    return <div className="alert alert-danger">Failed to load workouts: {error}</div>
  }

  return (
    <div>
      <h2>Workouts</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Difficulty</th>
            <th>Duration (min)</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.name}</td>
              <td>{workout.description}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.durationMinutes}</td>
              <td>{workout.exercises?.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Workouts
