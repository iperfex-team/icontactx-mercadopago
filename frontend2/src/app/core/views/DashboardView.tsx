import { CardWrapper } from "@/components";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

import { useAuthStore } from "@/store";
import { useEffect, useState } from "react";
import GaugeChart from "react-gauge-chart";
import { useStats } from "@/hooks/useStats";
import { lang } from "@/helpers";

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

export const DashboardView = () => {
    const token = useAuthStore((state) => state.token);
    const icid = useAuthStore((state) => state.icid);
    const [cpuChart, setCpuChart] = useState<number | null>(null);
    const [ramChart, setRamChart] = useState<number | null>(null);
    const [metrics, setMetrics] = useState<Metrics | undefined>();
    const stats = useStats(metrics);

    useEffect(() => {
        const socket = new WebSocket(
            "wss://api.getpromp.net/api/v2/core/ws?m=dashboard"
        );

        const payload = {
            headers: { Authorization: "Bearer " + token, icid: icid },
        };

        socket.onopen = () => {
            console.log(
                "%c* WebSocket successfully connected",
                "font-size: 12px; font-weight: bold; color: green; text-shadow: 2px 3px 3px #1b1c1c40;"
            );

            console.log(
                `%c==== CLIENT ====`,
                "font-size: 12px; font-weight: bold; color: #bada55; text-shadow: 2px 3px 3px #1b1c1c40;"
            );

            console.log(
                `%cRX => Authorization: auth`,
                "font-size: 12px; font-weight: bold; color: #bada55; text-shadow: 2px 3px 3px #1b1c1c40;"
            );

            // Enviar el token JWT en el primer mensaje o a través de un encabezado
            socket.send(JSON.stringify(payload));
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);

            if (data.type === "auth") {
                if (data.status !== "success") {
                    console.log(
                        `%cTX <= Authorization: ${data.status}`,
                        "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                    );
                    socket.close();
                    return;
                }
                console.log(
                    `%c==== SERVER ====`,
                    "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                );
                console.log(
                    `%cTX <= Authorization: ${data.status}`,
                    "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                );
            } else {
                const { data: metrics } = data;
                // console.log({ metrics });
                setCpuChart(data.sys.cpu.used);
                setRamChart(data.sys.ram.used);
                setMetrics(metrics);

                // console.log(data.sys.cpu.used);
                // console.log(data.sys.ram.used);
                // console.log({ stats });
            }
        };

        socket.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        socket.onclose = (event) => {
            if (event.wasClean) {
                console.log(
                    `WebSocket closed cleanly, code=${event.code}, reason=${event.reason}`
                );
            } else {
                console.error(`WebSocket connection closed unexpectedly`);
            }
        };

        return () => {
            socket.close();
        };
    }, [icid, token]);

    return (
        <CardWrapper title={lang("dashboard.title")}>
            <div>
                <dl className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 xl:grid-cols-4">
                    {stats?.map((item: Stat) => (
                        <div
                            key={item.id}
                            className="relative px-4 pt-5 pb-12 overflow-hidden bg-gray-100 rounded-lg shadow sm:px-6 sm:pt-6"
                        >
                            <dt>
                                <div className="absolute p-3 bg-indigo-500 rounded-md">
                                    <item.icon
                                        className="w-6 h-6 text-white"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                                    {item.name}
                                </p>
                            </dt>
                            <dd className="flex items-baseline ml-16">
                                <p className="text-2xl font-semibold text-gray-900">
                                    {item.stat}
                                </p>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>

            <div className="mt-4">
                <div className="grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{lang("dashboard.cpuUsage")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart
                                id="gauge-chart-cpu"
                                percent={cpuChart! / 100}
                                textColor="#000000"
                                needleColor="#345243"
                                formatTextValue={(value: string) => `${value}%`}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                                {lang("dashboard.memoryUsage")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <GaugeChart
                                id="gauge-chart-ram"
                                percent={ramChart! / 100}
                                textColor="#000000"
                                needleColor="#345243"
                                formatTextValue={(value: string) => `${value}%`}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </CardWrapper>
    );
};
