import api from '@/api/client'

export type Role = 
| 'ADMIN'
| 'CANDIDATE'
| 'VOTER'


export interface User {
    id: number
    email: string
    name: string
    address: string
    role: Role
}


//AUTH RESPONSE
export interface AuthResponse {
    access_token: string
    user: User
}