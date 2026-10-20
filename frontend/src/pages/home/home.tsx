import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-slate-900">
      <h1 className="text-3xl font-bold text-emerald-400">Election System</h1>
      {user?.name && <p className="text-slate-300">Welcome, {user.name}</p>}
      <button onClick={handleLogout}
        className="rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
        Sign out
      </button>
    </div>
  )
}

export default Home