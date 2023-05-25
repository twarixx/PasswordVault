import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { Category } from "../components/Category";
import { MasterPasswordDialog } from "../components/dialogs/MasterPasswordDialog";
import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { PasswordOverview } from "../components/PasswordOverview";
import { load } from "../axios";
=======
import { toaster } from "evergreen-ui";
import { MasterPasswordContext } from "../context/MasterPasswordContext";
import { Link } from "react-router-dom";
import { MasterPasswordDialog } from "../components/MasterPasswordDialog";
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5

export const DashboardPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);
<<<<<<< HEAD

=======
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
    const { masterPassword, updateMasterPassword } = useContext(
        MasterPasswordContext
    );

<<<<<<< HEAD
    const { data, isLoading, error } = load(
        ["passwords", currentUser.username],
        `/passwords`
    );

    if (error) return <UnknownPage />

=======
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
    const navigate = useNavigate();

    return (
        <>
<<<<<<< HEAD
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/passwordadd"
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
                        {masterPassword ? (
                            <Link to="/passwordadd" className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                                <p className="font-semibold text-xl">
                                    Add Password
                                </p>
                            </Link>
                        ) : (
                            <>
                                <div onClick={() => setIsOpen(true)} className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                                    <p className="font-semibold text-xl">
                                        Add Password
                                    </p>

                                </div>
                            </>
                        )}
                        <div className="bg-stone-600 w-full rounded">
                            <div className="bg-stone-600 w-full rounded">
                                {isLoading ? "Loading..." : <PasswordOverview data={data} />}
                            </div>
                        </div>
                    </div>
                </div>
=======
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
>>>>>>> 9cc380055948b63a0f0353d3952c89623bceb1e5
            </div >
        </>
    );
};
