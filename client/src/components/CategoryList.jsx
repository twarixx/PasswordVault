import { useContext } from "react";
import { load } from "../axios";
import { Category } from "./Category";
import { AuthContext } from "../context/AuthContext";
import { UnknownPage } from "../pages/UnknownPage";
import { Link } from "react-router-dom";

export const CategoryList = () => {
    const { currentUser } = useContext(AuthContext);

    const { data, isLoading, error } = load(
        ["categories", currentUser.username],
        `/categories`
    );

    if (isLoading) return "Loading...";
    if (error) return <UnknownPage />;

    return (
        <div className="bg-stone-600 w-full rounded">
            <Link to={`/`}>
                <div className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 px-4 py-6">
                    <h1 className="text-lg font-semibold">Home</h1>
                </div>
            </Link>

            {data.map((category) => {
                return (
                    <Category
                        key={category.id}
                        name={category.name}
                        id={category.id}
                    />
                );
            })}
        </div>
    );
};
