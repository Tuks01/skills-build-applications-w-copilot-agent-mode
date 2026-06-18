import { useEffect, useState } from 'react'

const getBaseApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    return 'http://localhost:8000/api'
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

const apiUrl = getBaseApiUrl()

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/activities/`)
      .then((res) => res.json())
      .then((data) =>
        setActivities(
          Array.isArray(data)
            ? data
            : data.items || data.results || data.data || []
        )
      )
      .catch((err) => setError(err.message || 'Failed to load activities'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Activities</h2>
      <p>
        API: <code>{`${apiUrl}/activities/`}</code>
      </p>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {activities.map((activity) => (
            <li key={activity._id || activity.id}>
              {activity.type} — {activity.durationMinutes} min
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Activities
