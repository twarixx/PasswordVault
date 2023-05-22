import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(
    JSON.parse(localStorage.getItem("current_user")) || ""
);
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("current_user")) || ""
    );

    const login = (input) => {
        setCurrentUser(input);
    };

    const logout = () => {
        setCurrentUser("");

        localStorage.removeItem("current_user");
    };

    useEffect(() => {
        localStorage.setItem("current_user", JSON.stringify(currentUser));
    });

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
