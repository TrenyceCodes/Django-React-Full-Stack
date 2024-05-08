//represents a projected route that has an json web token
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    //catches authentication errors 
    useEffect(() => {
      auth().catch(() => setIsAuthorized(false));
    }, [])
    

    const refreshToken = async () => {
        const tokenRefresh = localStorage.getItem(REFRESH_TOKEN)

        try {
            const response = await api.post("/api/token/refresh/", {
                refresh: tokenRefresh
            });

            //checks if response is successfully we set authorization to true
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    //checks for authentication
    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false);
            return;
        }

        const decodedJsonWebToken = jwtDecode(token);
        const tokenExpiration = decodedJsonWebToken.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration > now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized == null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to="/login"/>
}

export default ProtectedRoute;