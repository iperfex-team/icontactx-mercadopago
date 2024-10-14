import { Terminal } from "@xterm/xterm";
import { StateCreator, create } from "zustand";

interface TerminalState {
    terminalInstance: Terminal | null;
    setTerminalInstance: (terminal: Terminal) => void;
    webSocket: WebSocket | null;
    setWebSocket: (socket: WebSocket) => void;
}

const storeApi: StateCreator<TerminalState> = (set) => ({
    terminalInstance: null,
    setTerminalInstance: (terminal: Terminal) =>
        set({ terminalInstance: terminal }),
    webSocket: null,
    setWebSocket: (socket) => set({ webSocket: socket }),
});

export const useTerminalStore = create<TerminalState>()(
    storeApi
    // devtools(persist(storeApi, { name: "terminal-store" }))
);
