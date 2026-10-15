import React, {useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Phone, Lock, Eye, EyeOff, Mail } from 'lucide-react'
import { Button, Input } from '../../components/ui/index'
import { useAuthStore } from '../../store/auth.store'
import { loginUser } from '../../api/index'
import toast from 'react-hot-toast'


export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)


  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email) e.email = 'email is required'
    if (!form.password) e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await loginUser(form)
      setAuth(res.data, res.access_token)
      toast.success(`Welcome back, ${res.data.name.split(' ')[0]}!`)
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className="auth-stack">
        <Input label="Phone number" type="tel" placeholder="+265991234567"
          icon={<Mail size={16} />}
          value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          error={errors.email} />

        <div className="field">
          <label className="field-label">Password</label>
          <div className="input-wrap">
            <span className="input-icon"><Lock size={16} /></span>
            <input
              type={showPw ? 'text' : 'password'}
              placeholder="Enter your password"
              className={`input input-with-icon ${errors.password ? 'input-error' : ''}`}
              style={{ paddingRight: 44 }}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            />
            <button type="button" className="pw-toggle" aria-label={showPw ? 'Hide password' : 'Show password'}
              onClick={() => setShowPw(p => !p)}>
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <div className="auth-actions">
          <Button type="submit" loading={loading}>Sign in</Button>
        </div>
      </form>
  )


}