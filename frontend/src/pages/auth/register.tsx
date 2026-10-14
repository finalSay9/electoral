import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { registerUser } from '../../api';




export const Register: React.FC = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
        address: '',
        password: ''
    })
    const { setAuth } = useAuthStore()
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)


    const up = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [f]: e.target.value }))

    const validateStep = () => {
        const e: Record<string, string> = {}
        if(form.email && !form.email.includes('@')) e.email = 'Invalid email'
        if(form.name && form.name.length < 3) e.name = 'name must be at least 3 characters'
        if (!form.address) e.address = 'Address is required'
        if(form.password && form.password.length < 6) e.password = 'password must be at least 6 characters'
        if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(form.password)) e.password = 'Must include upper, lower, number & special char'
    
        setErrors(e);
        return Object.keys(e).length == 0
    }


    const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validateStep()) return
    setLoading(true)
    try {
      const res = await registerUser({ ...form, email: form.email || undefined })
      setAuth(res.data, res.access_token)
      toast.success('Account created!')
      navigate('/dashboard')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Registration failed')
    } finally { setLoading(false) }
  }


}