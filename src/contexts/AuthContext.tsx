import { LoginProps, User } from "@/@types/types";
import { ReactNode, createContext, useState } from "react";


interface SignInReturnData {
    status: boolean,
    user: User | null
}

interface AuthContextType {
    signUp: (data: User) => void
    signIn: (data: LoginProps) => SignInReturnData
}

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)


export function AuthContextProvider({ children } : AuthContextProviderProps) {
    const [users, setUsers] = useState<User[]>([])

    function signUp(data: User) {
        const newUser = {
            name: data.name,
            email: data.email,
            password: data.password
        }

        setUsers(prevState => [...prevState, newUser])
    }

    function signIn(data: LoginProps) {
        const user = users.find(user => user.email === data.email && user.password === data.password)

        if(!user) {
            return { status: false, user: null }
        }

        return { status: true, user }
    }

    return(
        <AuthContext.Provider value={{
            signIn,
            signUp,
        }}>
            { children }
        </AuthContext.Provider>
    )
}