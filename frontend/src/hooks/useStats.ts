import { useTranslation } from "react-i18next";
import {
    BuildingIcon,
    LayoutDashboardIcon,
    TriangleAlertIcon,
    UsersIcon,
} from "lucide-react";

// Define el tipo para stats
type Stat = {
    id: string;
    name: string;
    stat: string;
    icon: React.ElementType;
    change: string;
    changeType: "increase" | "decrease";
};

interface Metrics {
    user: number;
    tenant: number;
    devices: number;
    ban: number;
}

// Define el custom hook
export const useStats = (metrics: Metrics | undefined) => {
    const { t } = useTranslation();
    const { user, tenant, devices, ban } = metrics ?? {
        user: 0,
        tenant: 0,
        devices: 0,
        ban: 0,
    };

    return <Stat[]>[
        {
            id: "user",
            name: t("dashboard.totalUserAccounts"),
            stat: user.toString(),
            icon: UsersIcon,
            change: "122",
            changeType: "increase",
        },
        {
            id: "tenant",
            name: t("dashboard.totalTenantsAccounts"),
            stat: tenant.toString(),
            icon: BuildingIcon,
            change: "5.4%",
            changeType: "increase",
        },
        {
            id: "devices",
            name: t("dashboard.totalDevices"),
            stat: devices.toString(),
            icon: LayoutDashboardIcon,
            change: "3.2%",
            changeType: "decrease",
        },
        {
            id: "ban",
            name: t("dashboard.banAlert"),
            stat: ban.toString(),
            icon: TriangleAlertIcon,
            change: "3.2%",
            changeType: "decrease",
        },
    ];
};
