import { FitAddon } from "@xterm/addon-fit";
import { Terminal } from "@xterm/xterm";
import { CloudShellSessionResponseData } from "../interfaces";
import { useCloudShellStore, useTerminalStore } from "@/store";

interface ITerminal {
    token: string;
    icid: string;
    session: CloudShellSessionResponseData | undefined;
}

export const useTerminal = (
    terminalRef: React.MutableRefObject<HTMLDivElement | null>,
    { token, icid, session }: ITerminal
) => {
    const { setTerminalInstance } = useTerminalStore();
    const setTerminalStatus = useCloudShellStore(
        (state) => state.setTerminalStatus
    );
    const initializeXTerm = () => {
        if (!terminalRef!.current) return;

        const payload = {
            headers: { Authorization: "Bearer " + token, icid: icid },
        };

        const term = new Terminal({
            cursorBlink: true,
            theme: {
                foreground: "#7e9192",
                background: "\x1b[33m",
            },
            scrollback: 1000, // Habilitar historial de scroll
        });

        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);
        const textDecoder = new TextDecoder();
        term.open(terminalRef.current); // Add the optional chaining operator and provide a default value of null

        const socket = new WebSocket(
            "wss://api.getpromp.net/api/v2/webssh/ws?s=" + session?.session
        );

        socket.binaryType = "arraybuffer";

        socket.onopen = function () {
            console.log(
                "%c* Terminal WebSocket successfully connected",
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

            term.writeln("Connecting to SSH server...");
            fitAddon.fit(); // Ajustar el tamaño de la terminal al abrir la conexión
            socket.send(JSON.stringify(payload));
            sendTerminalSize(socket, term, fitAddon);
            term.writeln("Connected to the server.");
        };

        socket.onmessage = function (event) {
            console.log("on message");
            try {
                // Check if event.data is a string
                if (typeof event.data === "string") {
                    const message = JSON.parse(event.data);

                    if (message.type === "auth") {
                        if (message.status !== "success") {
                            console.log(
                                `%cTX <= Authorization: ${message.status}`,
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
                            `%cTX <= Authorization: ${message.status}`,
                            "font-size: 12px; font-weight: bold; color: #D529CA; text-shadow: 2px 3px 3px #1b1c1c40;"
                        );
                    } else {
                        term.write(event.data);
                    }
                } else {
                    setTerminalStatus("ready");
                    // Handle ArrayBuffer data
                    const text = textDecoder.decode(new Uint8Array(event.data));
                    term.write(text);
                }
            } catch (error) {
                console.error("Failed to parse message as JSON:", error);
                console.error("Received data:", event.data);
            }
        };

        socket.onerror = function (event) {
            console.error("WebSocket error:", event);
            term.writeln("WebSocket error. See console for details.");
        };

        socket.onclose = function () {
            setTerminalStatus("disconnected");

            term.writeln("Disconnected from the server.");

            // initializeXTerm();
        };

        term.onData(function (data) {
            socket.send(data);
        });

        // Establecer la instancia de la terminal en el estado global
        setTerminalInstance(term);

        return { term, fitAddon, socket };
    };

    const sendTerminalSize = (
        socket: WebSocket,
        term: Terminal,
        fitAddon: FitAddon
    ) => {
        if (socket.readyState === WebSocket.OPEN) {
            fitAddon.fit(); // Ajustar el tamaño de la terminal
            const { cols, rows } = term; // Obtener columnas y filas ajustadas
            console.log(`cols: ${cols} | rows: ${rows}`);
            socket.send(JSON.stringify({ cols, rows }));
        }
    };

    // useEffect(() => {
    //     const { term, fitAddon, socket } = initializeXTerm() as {
    //         term: Terminal;
    //         fitAddon: FitAddon;
    //         socket: WebSocket;
    //     };
    //     window.addEventListener("resize", function () {
    //         sendTerminalSize(socket, term, fitAddon); // Ajustar el tamaño de la terminal al redimensionar la ventana
    //     });

    //     // Ajustar el tamaño del terminal al cargar la página
    //     // window.onload = sendTerminalSize;
    // }, []); // Remove the unnecessary dependencies array and change the return type to void

    return { initializeXTerm };
};
