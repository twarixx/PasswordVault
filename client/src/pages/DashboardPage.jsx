import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const DashboardPage = () => {
    const { logout } = useContext(AuthContext);

    return (
        <div>
            <p>Dashboard</p>
            <button
                className="bg-sky-500 px-4 py-2 rounded text-white"
                onClick={(e) => logout}
            >
                Logout
            </button>
        </div>
    );
};
