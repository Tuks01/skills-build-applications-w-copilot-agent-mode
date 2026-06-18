import { useEffect, useState } from 'react'

const getUsersEndpoint = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/'
}

const usersEndpoint = getUsersEndpoint()

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(usersEndpoint)
      .then((res) => res.json())
      .then((data) =>
        setUsers(
          Array.isArray(data)
            ? data
            : data.items || data.results || data.data || []
        )
      )
      .catch((err) => setError(err.message || 'Failed to load users'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <p>
        API: <code>{usersEndpoint}</code>
      </p>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul>
          {users.map((user) => (
            <li key={user._id || user.id}>{user.name || user.email}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Users
