import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toaster } from "evergreen-ui";
import { Link } from "react-router-dom";
import { Category } from "../components/Category";
import { MasterPasswordDialog } from "../components/dialogs/MasterPasswordDialog";
import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { PasswordOverview } from "../components/PasswordOverview";

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
                            <Category name="Socials" />
                            <Category name="Games" />
                            <Category name="Work" />
                            <Category name="Super Secret" />
                        </div>
                    </div>

                    <div className="w-[70%] flex flex-col gap-6">
                        {masterPassword ? (useNavigate("/passwordadd")) : (
                            <>
                                <div onClick={() => setIsOpen(true)} className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                                    <p className="font-semibold text-xl">
                                        Add Password
                                    </p>

                                </div>
                            </>
                        )}
                        <div className="bg-stone-600 w-full rounded">
                            <div className="flex items-center justify-center py-4">
                                <p className="font-semibold text-xl">
                                    List of passwords!
                                </p>
                            </div>
                            <div className="bg-stone-600 w-full rounded">
                                <PasswordOverview />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
