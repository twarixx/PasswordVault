import { BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Category = ({ name, id = 0 }) => {
    return (
        <Link to={`/category/${id}`}>
            <div className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 px-4 py-6">
                <h1 className="text-lg font-semibold">{name}</h1>
                <Link to={`/category/${id}/edit`}>
                    <BsPencil size={24} />
                </Link>
            </div>
        </Link>
    );
};
