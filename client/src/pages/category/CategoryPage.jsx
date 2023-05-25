import { useContext, useState } from "react";
import { MasterPasswordContext } from "../../context/MasterPasswordContext";
import { AuthContext } from "../../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import { UnknownPage } from "../UnknownPage";
import { MasterPasswordDialog } from "../../components/dialogs/MasterPasswordDialog";
import { CategoryList } from "../../components/CategoryList";
import { PasswordOverview } from "../../components/PasswordOverview";
import { load } from "../../axios";

export const CategoryPage = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser } = useContext(AuthContext);

    const { masterPassword } = useContext(MasterPasswordContext);

    const { data, isLoading, error } = load(
        ["passwords", currentUser.username, id],
        `/categories/${id}/passwords`
    );

    if (error) return <UnknownPage />;

    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination="/passwordadd"
            />

            <div className="flex w-[100vw] mx-24">
                <div className="flex flex-row justify-between w-full gap-24">
                    <div className="w-[30%] flex flex-col gap-6">
                        <Link
                            to="/categoryadd"
                            className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16"
                        >
                            <div className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16">
                                <p className="font-semibold text-xl">
                                    Add Category
                                </p>
                            </div>
                        </Link>

                        <CategoryList />
                    </div>

                    <div className="w-[70%] flex flex-col gap-6">
                        {masterPassword ? (
                            <Link
                                to="/passwordadd"
                                className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16"
                            >
                                <p className="font-semibold text-xl">
                                    Add Password
                                </p>
                            </Link>
                        ) : (
                            <>
                                <div
                                    onClick={() => setIsOpen(true)}
                                    className="bg-stone-600 w-full rounded flex items-center justify-center p-4 h-16"
                                >
                                    <p className="font-semibold text-xl">
                                        Add Password
                                    </p>
                                </div>
                            </>
                        )}
                        <div className="bg-stone-600 w-full rounded">
                            <div className="bg-stone-600 w-full rounded">
                                {isLoading || !data.data ? (
                                    "Loading..."
                                ) : (
                                    <PasswordOverview data={data} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
