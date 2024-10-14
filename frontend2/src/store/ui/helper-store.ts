import { AuthService } from "@/services/auth.service";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface HelperState {
    isHelperOpen: boolean;
    hidePermanently: boolean;
    module?: string;
    helperUrl?: string;

    setHelperOpen: (isOpen: boolean) => void;
    setHidePermanently: (hide: boolean) => void;
    setModule: (module: string) => void;
    setHelperUrl: (module: string, section: string) => Promise<void>;
}

const storeApi: StateCreator<HelperState> = (set) => ({
    isHelperOpen: false,
    hidePermanently: false,
    module: undefined,
    helperUrl: undefined,

    setHelperOpen: (isOpen) => set({ isHelperOpen: isOpen }),
    setHidePermanently: (hide) => set({ hidePermanently: hide }),
    setModule: (module) => set({ module }),
    setHelperUrl: async (module, section) => {
        try {
            const helper = await AuthService.getHelper(module, section);
            set({ helperUrl: helper.url });
        } catch (error) {
            console.error(error);
            throw new Error("An error occurred while getting helper data.");
        }
    },
});

export const useHelperStore = create<HelperState>()(
    devtools(persist(storeApi, { name: "helper-store" }))
);
