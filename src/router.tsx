import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts";
import {
    NotFoundView,
} from "@/views";
import { ProtectedRoutes } from "./router/ProtectedRoutes";
import { Payment } from "@/app/core/views";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<AppLayout />}>
                        <Route path="/payment/:payment_id" element={<Payment />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}
