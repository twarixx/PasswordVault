
import { load } from "../axios";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { UnknownPage } from "../pages/UnknownPage";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

export const PasswordOverview = (data) => {
    return data.data.map(item => (
        <div className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 px-4 py-3">
            <div className="flex justify-between items-center w-full">
                <div className="flex">
                    <ul>
                        <li>{item.email}</li>
                        <li>{item.username}</li>
                        <li><a href={item.website}>{item.website}</a></li>
                    </ul>
                </div>
                <div className="flex flex-row  gap-5">
                    <p className=" bg-blue-500 rounded w-full flex items-center justify-center p-4" > Social Media </p>
                    <Link to={`/passwordedit/${item.id}/edit`}>
                        <FaEye className="rounded text-color-white" size={50} />
                    </Link>
                </div>
            </div>
        </div >)
    )
}