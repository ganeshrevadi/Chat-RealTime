import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

const PrivateRoutes = () => {
    const user = false
    return (
        <>
        {user ? <Outlet/> : <Navigate to="/login"/>}

        </>
    );
    }

export default PrivateRoutes;