import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import CategoryIndex from "./pages/category/Index";
import CategoryCreate from "./pages/category/Create";
import CategoryEdit from "./pages/category/Edit";

import BookIndex from "./pages/book/Index";
import BookCreate from "./pages/book/Create";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ClientProtectedLayout from "./layouts/ClientProtectedLayout";
import Cart from "./pages/Cart";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        path: "/admin/category",
                        element: <CategoryIndex />,
                    },
                    {
                        path: "/admin/category/create",
                        element: <CategoryCreate />,
                    },
                    {
                        path: "/admin/category/:id/edit",
                        element: <CategoryEdit />,
                    },
                    {
                        path: "/admin/book",
                        element: <BookIndex />,
                    },
                    {
                        path: "/admin/book/create",
                        element: <BookCreate />,
                    },
                ],
            },
            {
                element: <ClientProtectedLayout />,
                children: [
                    {
                        path: "/cart",
                        element: <Cart />,
                    }
                ]
            }
        ],
    },
]);

export default router;
