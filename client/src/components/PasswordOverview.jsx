import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MasterPasswordDialog } from "./dialogs/MasterPasswordDialog";
import { useContext, useState } from "react";
import { MasterPasswordContext } from "../context/MasterPasswordContext";

export const PasswordOverview = (data) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [destination, setDestination] = useState("");

    const { masterPassword } = useContext(MasterPasswordContext);

    console.log(data)
    return (
        <>
            <MasterPasswordDialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                destination={destination}
            />
            {data.data.map((item) => (
                <div
                    className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 rounded px-4 py-3"
                    key={item.id}
                >
                    <div className="flex justify-between items-center w-full ">
                        <div className="flex">
                            <ul>
                                <li>{item.username}</li>
                                <li>{item.website}</li>
                            </ul>
                        </div>
                        <div className="flex flex-row  gap-5">
                            <p className=" bg-blue-500 rounded w-full flex items-center justify-center p-4">
                                Social Media
                            </p>
                            <FaEye
                                onClick={(e) => {
                                    if (!masterPassword) {
                                        setDestination(`/password/${item.id}`);
                                        setIsOpen(true);
                                        return;
                                    }

                                    navigate(`/password/${item.id}`);
                                }}
                                className="rounded text-color-white hover:cursor-pointer"
                                size={50}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};
