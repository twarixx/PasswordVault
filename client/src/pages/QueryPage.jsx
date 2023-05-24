import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export const QueryPage = () => {
    const { query } = useParams();
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center gap-24 w-[100vw] z-2">
                <div className="bg-stone-600 rounded w-[75%] flex justify-center items-center p-4 h-16">
                    <p className="font-semibold text-xl">
                        Results for {query}:
                    </p>
                </div>
            </div>
        </div>
    );
};
