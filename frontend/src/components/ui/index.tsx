import React, { useId, useState } from 'react'
import { Loader2, Eye, EyeOff, X } from 'lucide-react'

// ── Button ──────────────────────────────────────────────
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
}

const buttonVariants = {
  primary:
    'bg-blue-600 text-white shadow-sm shadow-blue-600/25 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 disabled:shadow-none',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:text-slate-300',
  danger:
    'bg-red-600 text-white shadow-sm shadow-red-600/25 hover:bg-red-700 active:bg-red-800 disabled:bg-red-300 disabled:shadow-none',
  outline:
    'border border-blue-200 bg-white text-blue-700 hover:border-blue-300 hover:bg-blue-50 disabled:border-slate-200 disabled:text-slate-300',
}

const buttonSizes = {
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-12 px-6 text-base gap-2',
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading,
  children,
  className = '',
  disabled,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`}
    disabled={disabled || loading}
    {...props}
  >
    {loading && <Loader2 size={16} className="animate-spin" />}
    {children}
  </button>
)

// ── Input ────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({ label, error, icon, type, className = '', id, ...props }) => {
  const autoId = useId()
  const inputId = id ?? autoId
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type={isPassword && show ? 'text' : type}
          aria-invalid={!!error}
          className={`peer h-11 w-full rounded-xl border bg-white text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
            icon ? 'pl-11' : 'pl-3.5'
          } ${isPassword ? 'pr-11' : 'pr-3.5'} ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-blue-100'
          } ${className}`}
          {...props}
        />

        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex w-11 items-center justify-center text-slate-400 peer-focus:text-blue-600">
            {icon}
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(s => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-slate-400 transition hover:text-blue-600 focus:outline-none focus-visible:text-blue-600"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

// ── Badge ────────────────────────────────────────────────
interface BadgeProps {
  status: string
  label: string
  color: string
  bg: string
  border: string
}

export const Badge: React.FC<BadgeProps> = ({ label, color, bg, border }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium"
    style={{ color, backgroundColor: bg, borderColor: border }}
  >
    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
    {label}
  </span>
)

// ── Card ─────────────────────────────────────────────────
interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export const Card: React.FC<CardProps> = ({ children, className = '', style }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    style={style}
  >
    {children}
  </div>
)

// ── Skeleton ─────────────────────────────────────────────
export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style,
}) => <div className={`animate-pulse rounded-lg bg-slate-200 ${className}`} style={style} />

// ── Modal ────────────────────────────────────────────────
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-xl shadow-slate-900/10"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  )
}

// ── StatCard ─────────────────────────────────────────────
export const StatCard: React.FC<{
  label: string
  value: string
  sub?: string
  accent?: string
  icon?: React.ReactNode
}> = ({ label, value, sub, accent = '#2563eb', icon }) => (
  <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      {icon && (
        <span
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ color: accent, backgroundColor: `color-mix(in srgb, ${accent} 12%, white)` }}
        >
          {icon}
        </span>
      )}
    </div>
    <div>
      <p className="text-2xl font-extrabold tracking-tight" style={{ color: accent }}>
        {value}
      </p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  </div>
)