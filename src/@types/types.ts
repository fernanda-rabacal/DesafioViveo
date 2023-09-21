import { InputBaseComponentProps } from '@mui/material'

export interface InputProps extends InputBaseComponentProps {
    hasError?: boolean
}

export interface LoginProps {
    email: string;
    password: string
}

export interface RegisterProps extends LoginProps {
    name: string;
    cpf: string;
    phone: string;
    confirm_password: string;
}