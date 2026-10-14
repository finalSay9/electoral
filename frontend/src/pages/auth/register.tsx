import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { User, Lock, Mail, MapPin, Briefcase, UserPlus, ShieldCheck, LayoutDashboard } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api'
import { useAuthStore } from '../../store/auth.store'
import { Button, Input } from '../../components/ui'

export const Register: React.FC = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    name: '',
    address: '',
    password: '',
  })
  const { setAuth } = useAuthStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.email && !form.email.includes('@')) e.email = 'Enter a valid email address'
    if (form.name && form.name.length < 3) e.name = 'Name must be at least 3 characters'
    if (!form.address) e.address = 'Address is required'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters'
    else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password))
      e.password = 'Use an uppercase letter, a lowercase letter, a number and a special character'

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      const res = await registerUser({ ...form, email: form.email || undefined })
      setAuth(res.data, res.access_token)
      toast.success('Account created')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1fr_1.1fr]">
      {/* Brand panel (desktop only) */}
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-blue-600 via-blue-600 to-blue-800 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/20" />

        <div className="relative flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-blue-600 shadow-lg shadow-blue-900/20">
            <Briefcase size={22} />
          </span>
          <span className="text-lg font-semibold">Your App</span>
        </div>

        <div className="relative max-w-md">
          <h2 className="text-4xl font-bold leading-tight">Set up your account in a minute.</h2>
          <p className="mt-4 text-blue-100">
            Add your details once and go straight to your dashboard.
          </p>

          <ul className="mt-10 space-y-5">
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <UserPlus size={20} />
              </span>
              <div>
                <p className="font-medium">Quick sign-up</p>
                <p className="text-sm text-blue-100">Four fields and you are in.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <ShieldCheck size={20} />
              </span>
              <div>
                <p className="font-medium">Protected password</p>
                <p className="text-sm text-blue-100">We ask for a strong one to keep your account safe.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15">
                <LayoutDashboard size={20} />
              </span>
              <div>
                <p className="font-medium">Your dashboard</p>
                <p className="text-sm text-blue-100">Everything in one place after you register.</p>
              </div>
            </li>
          </ul>
        </div>

        <p className="relative text-sm text-blue-200">&copy; {new Date().getFullYear()} Your App</p>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Briefcase size={20} />
            </span>
            <span className="text-lg font-semibold text-slate-900">Your App</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create your account</h1>
          <p className="mt-2 text-slate-500">Enter your details below to get started.</p>

          <form onSubmit={handleSubmit} noValidate className="mt-8 flex flex-col gap-5">
            <Input
              label="Email (optional)"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              icon={<Mail size={18} />}
              value={form.email}
              onChange={up('email')}
              error={errors.email}
            />
            <Input
              label="Full name"
              placeholder="Mirriam Banda"
              autoComplete="name"
              icon={<User size={18} />}
              value={form.name}
              onChange={up('name')}
              error={errors.name}
            />
            <Input
              label="Address"
              placeholder="Aliko Street"
              autoComplete="street-address"
              icon={<MapPin size={18} />}
              value={form.address}
              onChange={up('address')}
              error={errors.address}
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 6 characters"
              autoComplete="new-password"
              icon={<Lock size={18} />}
              value={form.password}
              onChange={up('password')}
              error={errors.password}
            />

            <Button type="submit" size="lg" loading={loading} className="mt-2 w-full">
              {loading ? 'Creating account...' : 'Create account'}
            </Button>

            <p className="text-center text-sm text-slate-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  )
}