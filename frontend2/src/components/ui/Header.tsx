import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
    IoChevronDownOutline,
    IoMenuOutline,
    IoTerminalOutline,
} from "react-icons/io5";
import { useUIStore } from "@/store/ui/ui-store";
import { useAuthStore } from "@/store/auth/auth.store";
import { Avatar, AvatarImage } from "./avatar";
import { Button, Helper } from "@/components";
import { useCloudShellStore } from "@/store";

export const Header = () => {
    const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
    const userState = useAuthStore((state) => state.user);
    const { t } = useTranslation();

    const logout = useAuthStore((state) => state.logout);
    const cloudShellStatus = useCloudShellStore((state) => state.status);
    const terminalStatus = useCloudShellStore((state) => state.terminalStatus);
    const openCloudShell = useCloudShellStore((state) => state.openCloudShell);

    return (
        <>
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 sm:gap-x-6 sm:px-6 lg:px-8 bg-[#31353d] w-full px-4 shadow-sm shadow-slate-500/40">
                <div className="items-center hidden h-16 py-5 lg:flex shrink-0">
                    <img
                        className="w-64 min-h-fit max-w-[50%]"
                        src={userState?.company.logo}
                        alt={`${userState?.company.name} logo`}
                    />
                </div>
                <button
                    type="button"
                    className="-m-2.5 p-2.5 bg-[#3a3f48] text-[#6e768e] rounded-md w-10 h-10 shadow-md shadow-black/10 transition duration-300 ease-out flex items-center justify-center lg:hidden hover:bg-white"
                    onClick={() => setSidebarOpen(true)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <IoMenuOutline className="w-6 h-6" aria-hidden="true" />
                </button>

                <div className="flex self-stretch ml-auto gap-x-4 lg:gap-x-6">
                    <div className="flex items-center gap-x-4 lg:gap-x-6">
                        {/* CloudShell icon component */}
                        {terminalStatus === "ready" && (
                            <Button
                                className="hover:bg-transparent"
                                variant={"ghost"}
                                size={"icon"}
                                onClick={() => {
                                    const open =
                                        cloudShellStatus === "open"
                                            ? false
                                            : true;
                                    openCloudShell(open);
                                }}
                            >
                                <IoTerminalOutline className="w-6 h-6 text-white" />
                            </Button>
                        )}
                        {/* Helper */}
                        <Helper />
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative">
                            <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                <span className="sr-only">Open user menu</span>
                                <Avatar>
                                    <AvatarImage
                                        src={`https://ui-avatars.com/api?name=${userState?.fullName}`}
                                    />
                                </Avatar>
                                <span className="hidden lg:flex lg:items-center">
                                    <span
                                        className="ml-4 text-sm font-semibold leading-6 text-white"
                                        aria-hidden="true"
                                    >
                                        {userState?.fullName}
                                    </span>
                                    <IoChevronDownOutline
                                        className="w-5 h-5 ml-2 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Menu.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                    <Menu.Item>
                                        <button
                                            type="button"
                                            className="block px-3 py-1 text-sm leading-6 text-gray-900 bg-gray-50 hover:bg-gray-50"
                                            onClick={logout}
                                        >
                                            {t(
                                                "dashboard.header.profile.logout"
                                            )}
                                        </button>
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </>
    );
};
