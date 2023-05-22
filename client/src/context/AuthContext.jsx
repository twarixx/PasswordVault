import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

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
        console.log("logging out...");

        setCurrentUser("");
        localStorage.removeItem("current_user");
        makeRequest.post("/logout");
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
