import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import {
    IoBasketOutline,
    IoCloseOutline,
    IoGridOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoSpeedometerOutline,
    IoTrophyOutline,
} from "react-icons/io5";
import { SidebarItem } from "..";
import { useAuthStore, useUIStore } from "@/store/index";

export const Sidebar = () => {
    const { t } = useTranslation();
    const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
    const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
    // Obtenemos el estado del usuario dinámicamente
    const user = useAuthStore((state) => state.user);

    // Evaluamos si es administrador basado en el estado actual del usuario
    const isAdmin = user?.level === 0 || user?.level === 1;

    const baseUrl =
        process.env.NODE_ENV === "development"
            ? import.meta.env.VITE_CORE_API_DEV_URL
            : import.meta.env.VITE_CORE_API_PROD_URL

    const menuItems = [
        {
            title: "Dashboard",
            path: `${baseUrl}/dashboard`,
            icon: <IoSpeedometerOutline size={20} />,
            isVisible: isAdmin,
        },
        {
            title: "Users",
            path: `${baseUrl}/users`,
            icon: <IoPeopleOutline size={20} />,
            isVisible: isAdmin,
        },
        {
            title: "Devices",
            path: `${baseUrl}/devices`,
            icon: <IoGridOutline size={20} />,
            isVisible: isAdmin,
        },
        {
            title: "License",
            path: `${baseUrl}/licenses`,
            icon: <IoTrophyOutline size={20} />,
            isVisible: useAuthStore.getState().user?.level === 0,
        },
        {
            title: "Products",
            path: `${baseUrl}/products`,
            icon: <IoBasketOutline size={20} />,
            isVisible: true,
        },
    ];


    return (
        <>
            <div>
                <Transition.Root show={isSidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80"></div>
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex flex-1 w-full max-w-xs mr-16">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 flex justify-center w-16 pt-5 left-full">
                                            <button
                                                className="-m-2.5 p-2.5"
                                                onClick={() =>
                                                    setSidebarOpen(false)
                                                }
                                            >
                                                <span className="sr-only">
                                                    Close sidebar
                                                </span>
                                                <IoCloseOutline
                                                    className="w-6 h-6 text-white"
                                                    size={25}
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar component, swap this element with another sidebar if you like */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#31353d] px-6 pb-4">
                                        <div className="flex items-center py-5 shrink-0">
                                            <img
                                                className="w-64 mx-auto min-h-fit"
                                                src={"/images/logo.png"}
                                                alt="icontactx logo"
                                            />
                                        </div>
                                        <nav
                                            className="flex flex-col flex-1"
                                            role="list"
                                        >
                                            <div className="flex flex-col flex-1 gap-y-7">
                                                <div className="-mx-2 space-y-1">
                                                    {menuItems.map(
                                                        (item, index) =>
                                                            item.isVisible && (
                                                                <SidebarItem
                                                                    key={index}
                                                                    {...item}
                                                                />
                                                            )
                                                    )}
                                                </div>
                                                <div className="mt-auto">
                                                    <SidebarItem
                                                        title="Logout"
                                                        path="/logout"
                                                        icon={
                                                            <IoLogOutOutline
                                                                size={20}
                                                            />
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Sidebar for desktop */}
                <div className="hidden lg:pt-16 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex flex-col px-6 pb-4 overflow-y-auto bg-white grow gap-y-5 lg:pt-4">
                        <nav className="flex flex-col flex-1" role="list">
                            <div className="flex flex-col flex-1 gap-y-7">
                                <div className="-mx-2 space-y-1">
                                    {menuItems.map(
                                        (item, index) =>
                                            item.isVisible && (
                                                <SidebarItem
                                                    key={index}
                                                    title={t(
                                                        "dashboard.nav." +
                                                        item.title.toLowerCase()
                                                    )}
                                                    icon={item.icon}
                                                    path={item.path}
                                                />
                                            )
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};
