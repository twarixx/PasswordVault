import { Menu, Transition } from "@headlessui/react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { AiFillCaretDown } from "react-icons/ai";

export const UserDropdown = () => {
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
        <>
            <Menu>
                <div className="flex flex-col z-30">
                    <Menu.Button>
                        <p className="text-lg hover:cursor-pointer flex items-center gap-0.5">
                            {currentUser.username} <AiFillCaretDown size="14" />
                        </p>
                    </Menu.Button>
                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-zinc-700 shadow-lg outline-none">
                            <Link to={`/upgrade`}>
                                <div className="px-3 py-3 text-lg hover:bg-zinc-600 border-b-2 border-b-zinc-800">
                                    <Menu.Item>
                                        <p>Upgrade Account</p>
                                    </Menu.Item>
                                </div>
                            </Link>
                            <div
                                onClick={handleLogout}
                                className="px-3 py-3 text-lg hover:bg-zinc-600 border-b-2 border-b-zinc-800 hover:cursor-pointer"
                            >
                                <Menu.Item>
                                    <p>Sign out</p>
                                </Menu.Item>
                            </div>
                            {currentUser.role === "Admin" ? (
                                <Link to={`/admin`}>
                                    <div className="px-3 py-3 text-lg hover:bg-zinc-600 border-b-2 border-b-zinc-800">
                                        <Menu.Item>
                                            <p>Admin Panel</p>
                                        </Menu.Item>
                                    </div>
                                </Link>
                            ) : (
                                ""
                            )}

                            <div className="px-3 py-3 text-lg hover:bg-zinc-600">
                                <Menu.Item>
                                    <p>Account Type: {currentUser.role}</p>
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </div>
            </Menu>
        </>
    );
};
