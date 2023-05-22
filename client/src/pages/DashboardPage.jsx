import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";

export const DashboardPage = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();

        logout();
        navigate("/login");
        toaster.success("Successfully signed out!", {
            hasCloseButton: true,
            duration: 5,
            id: "logout-successful",
        });
    };

    return (
        <div>
            <p>Dashboard</p>
            <button
                className="bg-sky-500 px-4 py-2 rounded text-white"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};
