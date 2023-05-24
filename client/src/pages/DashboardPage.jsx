import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
    const { currentUser } = useContext(AuthContext);
    const { masterPassword, updateMasterPassword } = useContext(
        MasterPasswordContext
    );

    const navigate = useNavigate();

    return (
        <div className="flex justify-between gap-24 mx-24 w-[100vw] z-2">
            <div className="bg-stone-600 rounded w-[30%] flex items-center justify-center p-4 h-16">
                <p className="font-semibold text-xl">Add Category</p>
            </div>
            <div className="bg-stone-600 rounded w-full flex items-center justify-center p-4 h-16">
                <Link to="./passwordadd">
                    <p className="font-semibold text-xl">Add Password</p>
                </Link>
            </div>
        </div>
    );
};
