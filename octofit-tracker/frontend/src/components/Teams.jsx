import { useEffect, useState } from 'react'

const getBaseApiUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (!codespaceName) {
    return 'http://localhost:8000/api'
  }
  return `https://${codespaceName}-8000.app.github.dev/api`
}

const apiUrl = getBaseApiUrl()

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${apiUrl}/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(Array.isArray(data) ? data : data.items || []))
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      <p>
        API: <code>{`${apiUrl}/teams/`}</code>
      </p>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {teams.map((team) => (
            <li key={team._id || team.id}>{team.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Teams
