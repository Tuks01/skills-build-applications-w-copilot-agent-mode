import { useEffect, useState } from 'react'

const getBaseApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    return 'http://localhost:8000/api'
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

const apiUrl = getBaseApiUrl()

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/workouts/`)
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
        API: <code>{`${apiUrl}/workouts/`}</code>
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
