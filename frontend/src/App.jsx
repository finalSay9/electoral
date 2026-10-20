import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Register } from './pages/auth/register'
import { Login } from './pages/auth/login'
import { Home } from './pages/home/home'
import { useAuthStore } from './store/auth.store'
import './App.css'

/** Only logged-in users get through; everyone else goes to /login. */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

/** Login/Register are for logged-out users; logged-in users go straight to /home. */
const PublicOnlyRoute = ({ children }) => {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated)
  return isAuthenticated ? <Navigate to="/home" replace /> : <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
        <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        {/* "/" and anything unknown → /home (which bounces to /login if logged out) */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>

      <Toaster position="top-right" />
    </BrowserRouter>
  )
}