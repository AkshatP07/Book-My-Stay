import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/profile', { withCredentials: true });
                console.log(response.data);
                setUser(response.data);
                setReady(true);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };
            fetchUserProfile();
        
    }, []); 

    return (
        <UserContext.Provider value={{ user, setUser ,ready ,setReady }}>
            {children}
        </UserContext.Provider>
    );
}
