import { InputBaseComponentProps } from '@mui/material'

export interface InputProps extends InputBaseComponentProps {
    errorMessage?: string
}

export interface User {
    name: string;
    email: string;
    password: string
}

export type LoginProps = Omit<User, 'name'>

export interface RegisterProps extends LoginProps {
    cpf: string;
    phone: string;
    cep: string;
    street: string;
    number: number;
    neighbour: string;
    city: string;
    uf: string;
    complement?:string
}