import { useEffect, useState } from 'react'

const getBaseApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    return 'http://localhost:8000/api'
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

const apiUrl = getBaseApiUrl()

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/leaderboard/`)
      .then((res) => res.json())
      .then((data) =>
        setEntries(
          Array.isArray(data)
            ? data
            : data.items || data.results || data.data || []
        )
      )
      .catch((err) => setError(err.message || 'Failed to load leaderboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Leaderboard</h2>
      <p>
        API: <code>{`${apiUrl}/leaderboard/`}</code>
      </p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {entries.map((entry) => (
            <li key={entry.user || entry._id || entry.id}>
              Rank {entry.rank}: {entry.totalCalories} cal
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Leaderboard
