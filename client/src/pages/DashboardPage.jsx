import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { Link } from "react-router-dom";
import { MasterPasswordDialog } from "../components/dialogs/MasterPasswordDialog";
import { MasterPasswordContext } from "../context/MasterPasswordContext";


export const DashboardPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { masterPassword, updateMasterPassword } = useContext(
        MasterPasswordContext
    );

    const navigate = useNavigate();

    return (
        <>
            <MasterPasswordDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
            <div className="flex justify-between gap-24 mx-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[30%] flex items-center justify-center p-4 h-16">
                    <p className="font-semibold text-xl">Add Category</p>
                </div>

                {masterPassword ? (useNavigate("/passwordadd")) : (
                    <>
                        <div onClick={() => setIsOpen(true)} className="bg-stone-600 rounded w-full flex items-center justify-center p-4 h-16">
                            <p className="font-semibold text-xl">Add Password</p>
                        </div>
                    </>
                )}
            </div >
        </>
    );
};
