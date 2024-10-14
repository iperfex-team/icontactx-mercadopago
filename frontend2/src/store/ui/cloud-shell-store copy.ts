import { CloudShellService } from "@/services/cloud-shell.service";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CloudShellState {
    isCloudShellStarting: boolean;
    cloudShellIsOpen: boolean;
    cloudShellSession: string;
    terminalReady: boolean;
    terminalHasStarted: boolean;

    startCloudShell: (device: string) => void;
    openCloudShell: (isOpen: boolean) => void;
    checkTerminalStatus: (status: string) => void;
}

const storeApi: StateCreator<CloudShellState> = (set, get) => ({
    isCloudShellStarting: false,
    cloudShellIsOpen: false,
    cloudShellSession: "",
    terminalReady: false,
    terminalHasStarted: false,

    startCloudShell: async (device) => {
        try {
            const { data } = await CloudShellService.startSession(device);

            set({
                isCloudShellStarting: true,
                cloudShellSession: data.session,
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    openCloudShell: (isOpen) => {
        if (get().cloudShellIsOpen && get().terminalReady) {
            set({ terminalHasStarted: true });
        }
        set({ cloudShellIsOpen: isOpen });
    },

    checkTerminalStatus: (status) => {
        // Check if terminal is ready
        if (status === "ready") {
            set({ terminalReady: true });
        }
    },
});

export const useCloudShellStoreCopy = create<CloudShellState>()(
    devtools(persist(storeApi, { name: "cloud-shell-store" }))
);
