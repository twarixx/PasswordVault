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
import { UpgradePage } from "./pages/upgrade/UpgradePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MainLayout } from "./layouts/MainLayout";
import { UpgradePremiumPage } from "./pages/upgrade/UpgradePremiumPage";
import { QueryPage } from "./pages/QueryPage";

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
                    path: "/upgrade",
                    element: <UpgradePage />,
                },
                {
                    path: "/upgrade/paid",
                    element: <UpgradePremiumPage />,
                },
                {
                    path: "/query/:query",
                    element: <QueryPage />,
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
