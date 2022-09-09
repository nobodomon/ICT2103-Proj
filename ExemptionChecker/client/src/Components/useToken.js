import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    };
    const [token, setToken] = useState(getToken());
    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const clearToken = () =>{
        console.log("Logging out")
        setToken(null);
        sessionStorage.removeItem('token');
        
    }
    return {
        token,
        setToken: saveToken,
        logout: clearToken
    }
}