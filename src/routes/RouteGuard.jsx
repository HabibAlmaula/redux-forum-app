import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";
import { login } from "./routeName";

export const RouteGuard = () => {
    const { authUser } = useSelector((state) => state.authUser);
    return authUser ? <Outlet /> : <Navigate to={login} />;
};