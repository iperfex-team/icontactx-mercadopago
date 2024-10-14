import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout, RootLayout } from "@/layouts";
import { LoginView, NotFoundView } from "@/views";

import { ProtectedRoutes } from "./router/ProtectedRoutes";

import { ProductsView, ProductSelect, PaymentMethod, Payment } from "@/app/core/views";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<LoginView />} index />
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route element={<AppLayout />}>
                    <Route path="/products" element={<ProductsView />} />
                        <Route path="/product-pay/:payment_id" element={<ProductSelect />} />
                        <Route path="/payment-method/:payment_id" element={<PaymentMethod />} />
                        <Route path="/payment/:payment_id" element={<Payment />} />
                       
                    </Route>
                </Route>

                <Route path="*" element={<NotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
}
