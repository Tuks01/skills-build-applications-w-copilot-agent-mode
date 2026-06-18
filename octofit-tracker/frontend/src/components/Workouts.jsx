import { useEffect, useState } from 'react'

const getWorkoutsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/'
}

const workoutsEndpoint = getWorkoutsEndpoint()

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(workoutsEndpoint)
      .then((res) => res.json())
      .then((data) =>
        setWorkouts(
          Array.isArray(data)
            ? data
            : data.items || data.results || data.data || []
        )
      )
      .catch((err) => setError(err.message || 'Failed to load workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Workouts</h2>
      <p>
        API: <code>{workoutsEndpoint}</code>
      </p>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {workouts.map((workout) => (
            <li key={workout._id || workout.id}>{workout.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Workouts
