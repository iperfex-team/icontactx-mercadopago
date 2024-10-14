import { useAuthStore } from "@/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";


interface ProtectedRoutesProps {
    children?: React.ReactNode;
}

const getCookie = (name : string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const authStatus = useAuthStore((state) => state.status);
    const user = useAuthStore((state) => state.user);
    const location = useLocation();
    const loginUser = useAuthStore((state) => state.loginUser);


      if(authStatus === "unauthorized" && !getCookie('auth-store') ){
        return window.location.href = "http://localhost:5173"
    }

      
      if(!getCookie('auth-store') ){
        const logout = useAuthStore((state) => state.logout);
        logout();
    }
    

    if (location.pathname.startsWith("/licenses") && user?.level !== 0) {
        return <Navigate to={"/product-pay"} />;
    }

    if (location.pathname.startsWith("/devices/edit") && user?.level !== 0) {
        return <Navigate to={"/product-pay"} />;
    }

    return children ? children : <Outlet />;
};
