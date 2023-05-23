import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { UserDropdown } from "./dropdowns/UserDropdown";

export const NavBar = () => {
    return (
        <div className="w-full h-16 bg-black bg-opacity-40 flex items-center p-6 justify-between">
            <Link to="/">
                <p className="font-semibold text-xl hover:cursor-pointer">
                    PASSWORD VAULT
                </p>
            </Link>

            <UserDropdown />
        </div>
    );
};
