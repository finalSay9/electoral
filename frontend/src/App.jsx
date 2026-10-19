import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/auth/register'
import { Login } from './pages/auth/login'
import { Home } from './pages/home/home'
import './App.css'




export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      </BrowserRouter>
  )
}