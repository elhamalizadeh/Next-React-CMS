import { createContext } from "react";
import { useState, useEffect} from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    useEffect(() => {
        checkUserLoggedIn()
    } ,[])

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
    }

    // Login user
    const login = async (user) => {
        setError(null)
        setLoading(true);

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data.user)
            setLoading(false)
            router.push('/')
        } else {
            setError(handleError(data.message))
            setLoading(false)
        }
    }

    // Logout user
    const logout = async () => {
        setError(null)

        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });

        const data = await res.json();

        if (res.ok) {
            setUser(null)
            router.push('/')
        } else {
            setError(handleError(data.message))
        }
    }

    // Check if user logged in
    const checkUserLoggedIn = async () => {
        const res = await fetch('/api/auth/me');
        const data = await res.json();

        if (res.ok) {
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, loading, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export default AuthContext;