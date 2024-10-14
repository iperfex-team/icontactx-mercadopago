import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header, Loading, Sidebar } from "@/components";
import { useAuthStore } from "@/store/auth/auth.store";
import { Footer } from "@/components/ui/Footer";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { CloudShell } from "@/app/core/cloud-shell/components";

export const AppLayout = () => {
    // const setUser = useAuthStore((state) => state.setUser);
    const authStatus = useAuthStore((state) => state.status);
    const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.level === 2 || user?.level === 3) {
            return navigate("/products");
        }
    }, [user?.level, navigate]);

    if (authStatus === "pending" || !user) {
        checkAuthStatus();
        return <Loading />;
    }

    if (authStatus === "unauthorized") {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <div>
                <Header />
                <Sidebar />
                <div className="bg-gray-100 lg:pl-72">
                    <main className="py-10">
                        <div className="px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
                <Footer />
                <CloudShell />
            </div>

            <ToastContainer />
        </>
    );
};
