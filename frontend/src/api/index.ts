import axios from 'axios';
import api from './client';
import { AuthResponse } from '../types';


//auth
export const registerUser = (data: {
    email?: string;
    name: string;
    address: string;
    password: string;
}) => api.post<AuthResponse>('/users/register', data).then(res => res.data)