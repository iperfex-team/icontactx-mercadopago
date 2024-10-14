// TerminalComponent.tsx
import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
// import "xterm/css/xterm.css";
import { useTerminalStore } from "@/store/terminal/terminal.store";
import { CloudShellSessionResponseData } from "../interfaces";
import { useCloudShellStore } from "@/store";

interface ITerminal {
    token: string;
    icid: string;
    session: CloudShellSessionResponseData | undefined;
}
export const TerminalComponent = ({ token, icid, session }: ITerminal) => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const { terminalInstance, setTerminalInstance } = useTerminalStore();
    const setTerminalStatus = useCloudShellStore(
        (state) => state.setTerminalStatus
    );

    useEffect(() => {
        if (!terminalInstance && terminalRef.current) {
            console.log("llamando a la terminal...");
            const terminal = new Terminal({
                cursorBlink: true,
                theme: {
                    foreground: "#7e9192",
                    background: "#000000",
                },
                scrollback: 1000,
            });
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            const textDecoder = new TextDecoder();
            terminal.open(terminalRef.current);

            const payload = {
                headers: { Authorization: "Bearer " + token, icid: icid },
            };

            const socket = new WebSocket(
                `wss://api.getpromp.net/api/v2/webssh/ws?s=${session?.session}`
            );

            socket.binaryType = "arraybuffer";

            socket.onopen = () => {
                console.log("Terminal WebSocket connected");
                terminal.writeln("Connecting to SSH server...");
                fitAddon.fit();
                socket.send(JSON.stringify(payload));
                // sendTerminalSize(socket, term, fitAddon);
                terminal.writeln("Connected to the server.");
            };

            socket.onmessage = (event) => {
                if (typeof event.data === "string") {
                    const data = JSON.parse(event.data);
                    if (data.type === "auth") {
                        if (data.status !== "success") {
                            console.log(
                                `%cTX <= Authorization: ${data.status}`,
                                "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                            );
                            socket.close();
                            return;
                        }
                    } else {
                        terminal.write(event.data);
                    }
                } else {
                    setTerminalStatus("ready");
                    const text = textDecoder.decode(new Uint8Array(event.data));
                    terminal.write(text);
                }
            };

            socket.onerror = function (event) {
                console.error("WebSocket error:", event);
                terminal.writeln("WebSocket error. See console for details.");
            };

            socket.onclose = function () {
                // setTerminalStatus("disconnected");

                terminal.writeln("Disconnected from the server.");

                // initializeXTerm();
            };

            terminal.onData(function (data) {
                socket.send(data);
            });

            // Establecer la instancia de la terminal en el estado global
            setTerminalInstance(terminal);
        } else {
            setTerminalStatus("ready");

            console.log("HEllooo");
            terminalInstance?.focus();
            terminalInstance?.open(terminalRef.current!);
        }

        // return () => {
        //     terminalInstance?.dispose();
        // };
    }, [
        terminalInstance,
        setTerminalInstance,
        token,
        icid,
        session?.session,
        setTerminalStatus,
    ]);

    return (
        <div
            className="bg-[#21242b]"
            ref={terminalRef}
            style={{ height: "100%", width: "100%" }}
        />
    );
};
