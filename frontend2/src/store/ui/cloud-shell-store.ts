import {
    CloudShellSessionResponseData,
    CloudShellStatus,
    TerminalStatus,
} from "@/app/core/cloud-shell/interfaces";
import { CloudShellService } from "@/services/cloud-shell.service";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CloudShellState {
    status: CloudShellStatus;
    session?: CloudShellSessionResponseData;
    terminalStatus: TerminalStatus;
    cloudShellIsOpen: boolean;

    createSession: (device: string) => Promise<void>;
    closeSession: () => Promise<void>;
    checkSessionStatus: () => Promise<void>;

    openCloudShell: (isOpen: boolean) => void;
    setTerminalStatus: (status: TerminalStatus) => void;
}

const storeApi: StateCreator<CloudShellState> = (set) => ({
    status: "close",
    session: undefined,
    terminalStatus: "loading",
    cloudShellIsOpen: false,

    openCloudShell: (isOpen) => {
        set({ cloudShellIsOpen: isOpen, status: isOpen ? "open" : "close" });
    },

    createSession: async (device) => {
        try {
            set({ status: "loading" });
            const { data } = await CloudShellService.startSession(device);

            set({ status: "open", session: data });
        } catch (error) {
            set({ status: "close", session: undefined });
            console.error(error);
            throw error;
        }
    },

    closeSession: async () => {
        set({
            status: "close",
            session: undefined,
            terminalStatus: "disconnected",
            cloudShellIsOpen: false,
        });
    },

    checkSessionStatus: async () => {
        // try {
        //     const { data } = await CloudShellService.getSessionStatus(
        //         get().session?.id
        //     );
        //     set({ terminalStatus: data.status });
        // } catch (error) {
        //     console.error(error);
        //     throw error;
        // }
    },

    setTerminalStatus: (status: TerminalStatus) => {
        set({ terminalStatus: status });
    },
});

export const useCloudShellStore = create<CloudShellState>()(
    devtools(persist(storeApi, { name: "cloud-shell-store" }))
);
