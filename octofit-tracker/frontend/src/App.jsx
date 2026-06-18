import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const baseApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function App() {
  return (
    <div className="app">
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
        </nav>
      </header>

      {!codespaceName && (
        <div className="warning">
          <p>
            <strong>Note:</strong> Define <code>VITE_CODESPACE_NAME</code> in
            <code>.env.local</code> to use the Codespaces API URL.
          </p>
        </div>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2>Welcome to OctoFit Tracker</h2>
                <p>
                  The frontend uses React Router for navigation and fetches
                  backend data via Vite environment variables.
                </p>
                <p>
                  Base API URL: <code>{baseApiUrl}</code>
                </p>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
