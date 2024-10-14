import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/auth/auth.store";

export const Footer = () => {
    const userState = useAuthStore((state) => state.user);
    const { t } = useTranslation();

    return (
        <div
            className="bg-[#31353d] h-8 w-full text-white text-xs fixed bottom-0 left-0 z-50 hidden shadow md:flex md:items-center md:justify-between md:p-6"
            style={{ zIndex: 999999 }}
        >
            <span className="mx-auto text-center text-white sm:text-left sm:mx-0">
                © {new Date().getFullYear() + " "}
                <a href="https://flowbite.com/" className="hover:underline">
                    {userState?.company.name}
                </a>
                . {t("dashboard.footer.all rights reserved")}.
            </span>
        </div>
    );
};
