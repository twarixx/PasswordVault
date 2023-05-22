import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { UnknownPage } from "./pages/UnknownPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
    const queryClient = new QueryClient();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Outlet />,
            children: [
                {
                    path: "/",
                    element: <DashboardPage />,
                },
            ],
        },
        {
            path: "/",
            element: <Outlet />,
            children: [
                {
                    path: "/login",
                    element: <LoginPage />,
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
