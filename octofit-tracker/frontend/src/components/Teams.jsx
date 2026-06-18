import { useEffect, useState } from 'react'

const getTeamsEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/'
}

const teamsEndpoint = getTeamsEndpoint()

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(teamsEndpoint)
      .then((res) => res.json())
      .then((data) =>
        setTeams(
          Array.isArray(data)
            ? data
            : data.items || data.results || data.data || []
        )
      )
      .catch((err) => setError(err.message || 'Failed to load teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Teams</h2>
      <p>
        API: <code>{teamsEndpoint}</code>
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
