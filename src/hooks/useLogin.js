import React, { useState } from 'react'
import useAuthContext from './useAuthContext'

const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    
    const login = async (email, password) => {

        setIsLoading(true)
        setError(false)
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: {
                'Content-Type': "application/json"
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            setIsLoading(false)
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({type: 'LOGIN', payload: json})
        }

    }

    return { login, error, isLoading }
}

export default useLogin