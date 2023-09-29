import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Home from "./components/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "signup",
        element: <Signup />,
    },
]);

ReactDOM.createRoot(document.getElementById("react-app")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
