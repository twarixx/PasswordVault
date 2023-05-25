import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const MainLayout = () => {
    return (
        <div className="h-[100vh] w-full text-white">
            <div className="h-64 w-full relative">
                <img
                    className="h-full w-full object-center object-cover"
                    src="https://images.unsplash.com/photo-1516663235285-845fac339ca7"
                    height="16rem"
                />

                <div className="absolute top-0 w-full">
                    <NavBar />
                </div>

                <div className="w-full opacity-100 flex -mt-7 pb-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
