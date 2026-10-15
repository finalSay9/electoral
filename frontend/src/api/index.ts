import axios from 'axios';
import api from './client';
import { AuthResponse } from '../types';


//register api
export const registerUser = (data: {
    email?: string;
    name: string;
    address: string;
    password: string;
}) => api.post<AuthResponse>('/register', data).then(res => res.data)

//login api
export const loginUser = (data: {email: string, password: string}) =>
    api.post<AuthResponse>('/login', data).then(r => r.data )