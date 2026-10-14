import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Register } from './pages/auth/register'
import './App.css'




export default function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
      </BrowserRouter>
  )
}