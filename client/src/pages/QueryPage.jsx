import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { load, loadPost } from "../axios";
import { PasswordOverview } from "../components/PasswordOverview";
import { NoResults } from "../components/NoResults";

export const QueryPage = () => {
    const { query } = useParams();
    const { currentUser } = useContext(AuthContext);

    const { data, isLoading, error } = loadPost(
        ["search", currentUser.username, query],
        "/search",
        { query: query }
    );

    console.log(data);
    if (isLoading) {
        return "loading...";
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[75%] flex justify-center items-center p-4 h-16">
                    <p className="font-semibold text-xl">
                        Results for {query}:
                    </p>
                </div>
            </div>
            <div className="w-[75%] rounded">
                {data.length === 0 ? (
                    <NoResults />
                ) : (
                    <PasswordOverview data={data.data} />
                )}
            </div>
        </div>
    );
};
