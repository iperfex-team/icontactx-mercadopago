// import { Loading } from "@/components";
// import { useAuth } from "@/store";
import { useAuthStore } from "@/store";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const RootLayout = () => {
    const authStatus = useAuthStore((state) => state.status);
    const user = useAuthStore((state) => state.user);

    if (authStatus === "authorized") {
        if (user?.level === 2 || user?.level === 3) {
            return <Navigate replace to="/products" />;
        }

        return <Navigate to="/product-pay" />;
    }

    return (
        <>
            <Outlet />
            <ToastContainer />
        </>
    );
};
