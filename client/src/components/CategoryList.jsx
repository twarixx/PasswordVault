import { Category } from "./Category";

export const CategoryList = () => {
    return (
        <div className="bg-stone-600 w-full rounded">
            <Category name="Socials" />
            <Category name="Games" />
            <Category name="Work" />
            <Category name="Super Secret" />
        </div>
    );
};
