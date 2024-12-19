import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Check token in localStorage on app load
        const token = localStorage.getItem('token');

        setLoggedIn(!!token); // Set logged-in state based on token presence
    }, []);
    console.log("token");
    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
};
