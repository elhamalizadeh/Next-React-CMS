import { createContext } from "react";
import { useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleError = (message) => {
        const errors = [];
        Object.keys(message).map((key) => {
            message[key].map((e) => {
                errors.push(e)
            })
        })
        return errors.join();
    }

    // Register user
    const register = async (user) => {
        setError(null)
        setLoading(true);

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (res.ok) {
            setLoading(false)
            router.push('/auth/login')
        } else {
            setError(handleError(data.message))
            setLoading(false)
        }

        console.log(data);
    }

    // Login user
    const login = async (user) => {
        console.log(user);
    }

    // Logout user
    const logout = async () => {
        console.log(user);
    }

    // Check if user logged in
    const checkUserLoggedIn = async (user) => {
        console.log(user);
    }

    return (
        <AuthContext.Provider value={{ error, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;