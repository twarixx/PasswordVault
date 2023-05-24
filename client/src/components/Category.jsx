import { BsPencil } from "react-icons/bs";

export const Category = ({ name, border = true }) => {
    return (
        <div className="w-full flex justify-between items-center bg-stone-600 border-b-2 border-b-stone-700 px-4 py-6">
            <h1 className="text-lg font-semibold">{name}</h1>
            <BsPencil size={24} />
        </div>
    );
};
