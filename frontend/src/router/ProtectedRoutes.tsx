import { useAuthStore } from "@/store";
import { use2faStore } from "@/store/ui/2fa-store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRoutesProps {
    children?: React.ReactNode;
}

const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const logoutUrl =
    process.env.NODE_ENV === "development"
        ? import.meta.env.VITE_CORE_API_DEV_URL
        : import.meta.env.VITE_CORE_API_PROD_URL

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const authStatus = useAuthStore((state) => state.status);
    const logout = useAuthStore((state) => state.logout);
    const { is2FAAuthenticated } = use2faStore();
    const user = useAuthStore((state) => state.user);
    const totp = useAuthStore((state) => state.totp);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const action = searchParams.has("action")
        ? searchParams.get("action")
        : undefined;

    if (action === "logout") {
        logout("unauthorized");
    }

    if (authStatus === "unauthorized" && !getCookie('auth-store')) {
        return window.location.href = logoutUrl
    }

    if (!getCookie('auth-store')) {
        const logout = useAuthStore((state) => state.logout);
        logout();
    }

    if (!is2FAAuthenticated && totp) {
        // Si el 2FA está habilitado y no se ha completado, redirigir a la página de 2FA
        return <Navigate to={"/2fa"} />;
    }

    if (location.pathname.startsWith("/licenses") && user?.level !== 0) {
        return <Navigate to={"/dashboard"} />;
    }

    if (location.pathname.startsWith("/devices/edit") && user?.level !== 0) {
        return <Navigate to={"/dashboard"} />;
    }

    return children ? children : <Outlet />;
};
