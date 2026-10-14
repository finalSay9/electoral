import api from '../api/client'

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
    message: string
    access_token: string
    data: User
}

//api error
export interface ApiError {
    message: string
    statusCode: number
}

