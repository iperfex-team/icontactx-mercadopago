import { useTranslation } from "react-i18next";
import {
    IoBasketOutline,
    IoChevronDownOutline,
    IoCopyOutline,
    IoLanguageOutline,
    IoLogoWhatsapp,
    IoMenuOutline,
} from "react-icons/io5";
import { useUIStore } from "@/store/ui/ui-store";
import { useAuthStore } from "@/store/auth/auth.store";
import { Avatar, AvatarImage } from "./avatar";
import { Button, Helper} from "@/components";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    CreditCard,
    EyeIcon,
    LogOut,
    Mail,
    Settings,
    User,
} from "lucide-react";
import { toast } from "react-toastify";
import { use2faStore } from "@/store/ui/2fa-store";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
    const userState = useAuthStore((state) => state.user);
    const { t, i18n } = useTranslation();

    const logout = useAuthStore((state) => state.logout);
    const hide2faModal = use2faStore((state) => state.hidePermanently);
    const setHide2faModalPermanently = use2faStore(
        (state) => state.setHidePermanently
    );
    const setOpen2FAModal = use2faStore((state) => state.setOpen2FAModal);

    const navigate = useNavigate();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng); // Cambia el idioma y se guarda en localStorage
    };

    const getAvatarUrl = (): string => {
        return `${import.meta.env.VITE_CORE_API_URL}/avatar?name=${
            userState?.fullName
        }`;
    };

    const copyToClipboard = (text: number | undefined) => {
        navigator.clipboard
            .writeText(text?.toString() ?? "")
            .then(() => {
                toast.success(t("actions.copied_to_the_clipboard"));
            })
            .catch((err) => {
                console.error("Error al copiar al portapapeles: ", err);
            });
    };

    const handleSupportEmail = () => {
        const htmlString = userState?.support_email ?? "#";
        const hrefMatch = htmlString.match(/href='([^']*)'/);

        if (hrefMatch) {
            const hrefValue = hrefMatch[1];
            return hrefValue;
        } else {
            console.log("No se encontró el atributo href.");
        }
    };

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
                        {/* Helper */}
                        <Helper />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
                                >
                                    <span className="sr-only">
                                        Open lang picker
                                    </span>

                                    <IoLanguageOutline
                                        className="w-6 h-6 text-white"
                                        aria-hidden="true"
                                    />
                                    <span className="hidden lg:flex lg:items-center">
                                        <IoChevronDownOutline
                                            className="w-5 h-5 ml-2 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        onClick={() => changeLanguage("es")}
                                        className="justify-center cursor-pointer"
                                    >
                                        <img
                                            src="/images/flags/es.svg"
                                            alt="ES"
                                            className="w-6 h-4 mr-2"
                                        />
                                        {t("ES")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => changeLanguage("en")}
                                        className="justify-center cursor-pointer"
                                    >
                                        <img
                                            src="/images/flags/en.svg"
                                            alt="EN"
                                            className="w-6 h-4 mr-2"
                                        />
                                        {t("EN")}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => changeLanguage("pt")}
                                        className="justify-center cursor-pointer"
                                    >
                                        <img
                                            src="/images/flags/pt.svg"
                                            alt="PT"
                                            className="w-6 h-4 mr-2"
                                        />
                                        {t("PT")}
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* User profile menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="hover:bg-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
                                >
                                    <span className="sr-only">
                                        Open user menu
                                    </span>
                                    <Avatar>
                                        <AvatarImage
                                            // src={`https://ui-avatars.com/api?name=${userState?.fullName}`}
                                            src={getAvatarUrl()}
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
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="flex-col gap-y-2">
                                        <div className="flex items-start w-full font-semibold">
                                            <User className="w-4 h-4 mr-2" />
                                            <span>{userState?.typeuser}</span>
                                        </div>
                                        <Button
                                            className="flex justify-start w-full"
                                            variant={"ghost"}
                                            size={"icon"}
                                            onClick={() =>
                                                copyToClipboard(
                                                    userState?.customer_number
                                                )
                                            }
                                        >
                                            <IoCopyOutline className="w-4 h-4 mr-2" />
                                            {t(
                                                "dashboard.header.profile.client_number"
                                            )}
                                            : {userState?.customer_number}
                                        </Button>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="uppercase">
                                        {t(
                                            "dashboard.header.profile.my_account"
                                        )}
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`${
                                                userState?.core_my_products ??
                                                "#"
                                            }`}
                                        >
                                            <IoBasketOutline className="w-4 h-4 mr-2" />
                                            <span>
                                                {t(
                                                    "dashboard.header.profile.my_products"
                                                )}
                                            </span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`${
                                                userState?.pay_history ?? "#"
                                            }`}
                                        >
                                            <CreditCard className="w-4 h-4 mr-2" />
                                            <span>
                                                {t(
                                                    "dashboard.header.profile.payment_history"
                                                )}
                                            </span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`${
                                                userState?.core_account_settings ??
                                                "#"
                                            }`}
                                        >
                                            <Settings className="w-4 h-4 mr-2" />
                                            <span>
                                                {t(
                                                    "dashboard.header.profile.settings"
                                                )}
                                            </span>
                                        </a>
                                    </DropdownMenuItem>
                                    {hide2faModal && (
                                        <DropdownMenuItem asChild>
                                            <a
                                                href={`${
                                                    userState?.core_account_settings ??
                                                    "#"
                                                }`}
                                                onClick={() => {
                                                    event?.preventDefault();
                                                    setHide2faModalPermanently(
                                                        false
                                                    );
                                                    setOpen2FAModal(true);
                                                    navigate("/dashboard");
                                                }}
                                            >
                                                <EyeIcon className="w-4 h-4 mr-2" />
                                                <span>
                                                    {t(
                                                        "dashboard.header.profile.show_2fa_modal"
                                                    )}
                                                </span>
                                            </a>
                                        </DropdownMenuItem>
                                    )}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel className="uppercase">
                                        {t("dashboard.header.profile.support")}
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem asChild>
                                        <a
                                            href={`${
                                                userState?.support_chat ?? "#"
                                            }`}
                                            target="_blank"
                                        >
                                            <IoLogoWhatsapp className="w-4 h-4 mr-2" />
                                            <span>
                                                {t(
                                                    "dashboard.header.profile.whatsapp"
                                                )}
                                            </span>
                                        </a>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <a href={handleSupportEmail()}>
                                            <Mail className="w-4 h-4 mr-2" />
                                            <span>
                                                {t(
                                                    "dashboard.header.profile.email"
                                                )}
                                            </span>
                                        </a>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem asChild>
                                    <button
                                        className="w-full"
                                        onClick={() => logout()}
                                    >
                                        <LogOut className="w-4 h-4 mr-2" />
                                        <span>
                                            {t(
                                                "dashboard.header.profile.logout"
                                            )}
                                        </span>
                                    </button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </>
    );
};
