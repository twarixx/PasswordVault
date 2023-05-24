
import { load } from "../axios";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { UnknownPage } from "../pages/UnknownPage";
import { FaEye } from "react-icons/fa";


export const PasswordOverview = () => {
    const { currentUser } = useContext(AuthContext);

    const { data, isLoading, error } = load(
        ["passwords", currentUser.username],
        `/passwords`
    );

    console.log(data);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) return <UnknownPage />

    const items = data.map(item =>
        <div className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 px-4 py-6">
            <div className="flex justify-between">
                <div className="flex mt-4">
                    <ul>
                        <li>Lucaspinder9@gmail.com</li>
                        <li>Lucaspinder</li>
                        <li>Hyves</li>
                    </ul>
                </div>
                <div className="flex flex-row gap-2 mt-4">
                    <p className="bg-stone-600 rounded w-full flex items-center justify-center p-4 h-16" > Social Media </p>
                    <FaEye className="rounded text-color-white" size={24} />
                </div>
            </div>
        </div>
    );
};