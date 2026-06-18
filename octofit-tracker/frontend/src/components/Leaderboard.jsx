import { useEffect, useState } from 'react'

const getLeaderboardEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/'
}

const leaderboardEndpoint = getLeaderboardEndpoint()

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(leaderboardEndpoint)
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
        API: <code>{leaderboardEndpoint}</code>
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
