import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className="h-[100vh]">
            <div className="h-52">
                <img
                    className="object-cover object-center w-full h-full"
                    src="/images/dashboard-background.jpg"
                    alt="Background Image"
                />
            </div>
            <Outlet />
        </div>
    );
};
