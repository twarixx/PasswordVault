import { useContext } from "react";
import { load } from "../axios";
import { Category } from "./Category";
import { AuthContext } from "../context/AuthContext";
import { UnknownPage } from "../pages/UnknownPage";


export const CategoryList = () => {
    const { currentUser } = useContext(AuthContext);

    const { data, isLoading, error } = load(
        ["categories", currentUser.username],
        `/categories`
    );

    if (isLoading) return "Loading...";
    if (error) return <UnknownPage />;

    console.log(data);

    return (
        <div className="bg-stone-600 w-full rounded">
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
