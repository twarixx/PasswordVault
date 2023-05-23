import {
    Navigate,
    Outlet,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

import { UnknownPage } from "./pages/UnknownPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import { AddPasswordPage } from "./pages/Password/AddPasswordPage";


function App() {
    const { currentUser } = useContext(AuthContext);
    const queryClient = new QueryClient();

    const LoggedIn = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const LoggedOut = ({ children }) => {
        if (currentUser) {
            return <Navigate to="/" />;
        }

        return children;
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <LoggedIn>
                    <MainLayout />
                </LoggedIn>
            ),
            children: [
                {
                    path: "/",
                    element: <DashboardPage />,
                },
                {
                    path: "/passwordadd",
                    element: <AddPasswordPage />,
                }
            ],

        },



        {
            path: "/",
            element: (
                <LoggedOut>
                    <Outlet />
                </LoggedOut>
            ),
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
                },
            ],
        },
        {
            path: "/",
            element: (
                <LoggedOut>
                    <Outlet />
                </LoggedOut>
            ),
            children: [
                {
                    path: "/register",
                    element: <RegisterPage />,
                },
            ],
        },
        {
            path: "*",
            element: <UnknownPage />,
        },
    ]);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}

export default App;
