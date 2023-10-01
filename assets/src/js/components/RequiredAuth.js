import React from "react";

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useCachedAuth from "../hooks/useCachedAuth";

const RequiregAuth = () => {
    const { auth } = useAuth();
    const { cachedAuth } = useCachedAuth();
    const location = useLocation();

    return auth?.token || cachedAuth?.token ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiregAuth;
