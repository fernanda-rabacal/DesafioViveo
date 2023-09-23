import { LoginProps, User } from "@/@types/types";
import { ReactNode, createContext, useState } from "react";


interface SignInReturnData {
    status: boolean,
    user: User | null
}

interface UserContextType {
    signUp: (data: User) => void
    signIn: (data: LoginProps) => SignInReturnData
}

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext({} as UserContextType)


export function UserContextProvider({ children } : UserContextProviderProps) {
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
        <UserContext.Provider value={{
            signIn,
            signUp,
        }}>
            { children }
        </UserContext.Provider>
    )
}