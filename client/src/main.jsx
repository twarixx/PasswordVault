import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MasterPasswordContextProvider } from "./context/MasterPasswordContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthContextProvider>
            <MasterPasswordContextProvider>
                <App />
            </MasterPasswordContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);
