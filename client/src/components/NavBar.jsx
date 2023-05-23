import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const { currentUser, logout } = useContext(AuthContext);

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
        <div className="w-full h-16 bg-black bg-opacity-40 flex items-center p-6 justify-between">
            <Link to="/">
                <p className="font-semibold text-xl hover:cursor-pointer">
                    PASSWORD VAULT
                </p>
            </Link>
            <p onClick={handleLogout} className="text-lg hover:cursor-pointer">
                {currentUser.username}
            </p>
        </div>
    );
};
