import { createContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

export const MasterPasswordContext = createContext(null);
export const MasterPasswordContextProvider = ({ children }) => {
    const [masterPassword, setMasterPassword] = useState(null);

    const updateMasterPassword = (input) => {
        setMasterPassword(input);

        setTimeout(() => {
            setMasterPassword(null);
        }, 60000);
    };

    return (
        <MasterPasswordContext.Provider
            value={{ masterPassword, updateMasterPassword }}
        >
            {children}
        </MasterPasswordContext.Provider>
    );
};
