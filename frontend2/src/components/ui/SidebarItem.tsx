import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
    title: string;
    path: string;
    icon?: React.ReactNode;
    submenu?: boolean;
    submenuItems?: SidebarItemProps[];
}

export const SidebarItem = ({ title, path, icon }: SidebarItemProps) => {
    const location = useLocation();
    const isActive = location.pathname === path;

    return (
        <Link
            to={path}
            className={`group flex items-center gap-x-2 text-[#6e768e] leading-6 hover:text-white hover:bg-[#3a3f48] transition duration-300 ease-in-out px-4 py-3
                ${
                    isActive
                        ? "rounded-md text-white light:text-black light:bg-[#efefef] bg-[#3a3f48] dark:bg-[#3a3f48] dark:text-white"
                        : ""
                }
            `}
        >
            {icon}
            <span className="font-semibold leading-6">{title}</span>
        </Link>
    );
};
