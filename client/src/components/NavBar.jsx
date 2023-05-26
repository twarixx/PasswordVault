import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDropdown } from "./dropdowns/UserDropdown";
import { AiOutlineSearch } from "react-icons/ai";

export const NavBar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const submitSearch = (event) => {
        event.preventDefault();

        if (search === "") return;

        navigate(`/query/${search}`);
        setSearch("");
    };

    return (
        <div className="w-full h-16 bg-black bg-opacity-40 flex items-center p-6 justify-between">
            <Link to="/">
                <p className="font-semibold text-xl hover:cursor-pointer">
                    PASSWORD VAULT
                </p>
            </Link>

            <div className="w-[50%]">
                <form onSubmit={submitSearch}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-stone-500 text-white placeholder-white pl-9 relative px-2 py-1 rounded outline outline-stone-600 focus:outline-sky-500 hover:outline-sky-500 ring-0"
                        type="text"
                        placeholder="Search your vault"
                    />
                </form>
                <AiOutlineSearch className="absolute top-5 ml-1.5" size={24} />
            </div>

            <UserDropdown />
        </div>
    );
};
