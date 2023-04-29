
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"
import { useEffect } from 'react';

export function SignOut() {
    const { setUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {

        localStorage.removeItem("userToken")
        localStorage.removeItem("user")
        navigate("/sign-in")
        setUser({})

    }, [])



    return <>

    </>
}

