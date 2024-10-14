import { useCloudShellStore } from "@/store";
import { useEffect } from "react";
import { useTerminal } from "./useTerminal";
import { CloudShellSessionResponseData } from "../interfaces";

interface IUseCloudShellWS {
    token: string;
    icid: string;
    session: CloudShellSessionResponseData | undefined;
}
export const useCloudShellWS = (
    terminalRef: React.MutableRefObject<HTMLDivElement | null>,
    { token, icid, session }: IUseCloudShellWS
) => {
    const setTerminalStatus = useCloudShellStore(
        (state) => state.setTerminalStatus
    );
    const terminalStatus = useCloudShellStore((state) => state.terminalStatus);
    const { initializeXTerm } = useTerminal(terminalRef, {
        token: token ?? "",
        icid: icid ?? "",
        session,
    });

    useEffect(() => {
        const ws = new WebSocket(
            `wss://api.getpromp.net/api/v2/core/ws?m=cloudshell_loading&s=${session?.session}`
        );

        ws.binaryType = "arraybuffer";

        const payload = {
            headers: { Authorization: "Bearer " + token, icid: icid },
        };

        ws.onopen = () => {
            ws.send(JSON.stringify(payload));
        };

        ws.onmessage = (event) => {
            if (typeof event.data === "string") {
                const message = JSON.parse(event.data);

                console.log(message);

                if (message.type === "auth") {
                    if (message.status !== "success") {
                        ws.close();
                        return;
                    }
                } else {
                    if (message.status === 200 && message.data === "ready") {
                        console.log(
                            `%cTX <= Túnel listo`,
                            "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                        );

                        setTerminalStatus("ready");
                        ws.close();
                    }

                    // Si está en modo debug
                    // if (debug) {
                    //     console.log(`%cTX <= ${event.data}`, 'font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;');
                    // }
                }
            }
        };

        // Manejar el evento 'onerror' del WebSocket
        ws.onerror = (error) => {
            console.error(`WebSocket error: ${error}`);
        };

        // Manejar el evento 'onclose' del WebSocket
        ws.onclose = () => {
            console.log("WebSocket connection closed");
        };
    }, [
        icid,
        initializeXTerm,
        session?.session,
        setTerminalStatus,
        terminalStatus,
        token,
    ]);

    return terminalStatus === "ready";
};
