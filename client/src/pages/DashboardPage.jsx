import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { Link } from "react-router-dom";
import { MasterPasswordDialog } from "../components/MasterPasswordDialog";
import { Category } from "../components/Category";

export const DashboardPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const { masterPassword, updateMasterPassword } = useContext(
        MasterPasswordContext
    );

    const navigate = useNavigate();

    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />

            <div className="flex w-[100vw] mx-24">
                <div className="flex flex-row justify-between w-full gap-24">
                    <div className="w-[30%] flex flex-col gap-6">
                        <div className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                            <p className="font-semibold text-xl">
                                Add Category
                            </p>
                        </div>

                        <div className="bg-stone-600 w-full rounded">
                            <div className="flex items-center justify-center py-4 pb-3">
                                <p className="font-semibold text-xl">
                                    Add Category
                                </p>
                            </div>

                            <Category name="Test" />
                        </div>
                    </div>

                    <div className="w-[70%] flex flex-col gap-6">
                        <div className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                            <p className="font-semibold text-xl">
                                Add Password
                            </p>
                        </div>
                        <div className="bg-stone-600 w-full rounded">
                            <div className="flex items-center justify-center py-4">
                                <p className="font-semibold text-xl">
                                    List of passwords!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
