import React, {useEffect, useState} from 'react'
import axios from 'axios';




export const Register: React.FC = () => {
    const [form, setForm] = useState({
        email: '',
        name: '',
        address: '',
        password: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

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


}