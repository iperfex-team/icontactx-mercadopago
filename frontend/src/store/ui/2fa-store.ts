import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface TfaState {
    is2faModalOpen: boolean; // Sirve para chequear si el modal de 2FA está abierto
    hidePermanently: boolean; // Sirve para chequear si el usuario quiere ocultar el modal de 2FA
    is2FAEnabled: boolean; // Sirve para chequear si el usuario tiene habilitado 2FA
    is2FAAuthenticated: boolean; // Sirve para chequear si el usuario ya se autenticó con 2FA
    open2FAModal: boolean;

    set2faModalOpen: (isOpen: boolean) => void;
    setHidePermanently: (hide: boolean) => void;
    setIs2FAEnabled: (isEnabled: boolean) => void;
    setIs2FAAuthenticated: (isAuthenticated: boolean) => void;
    setOpen2FAModal: (open: boolean) => void;
}

const storeApi: StateCreator<TfaState> = (set) => ({
    is2faModalOpen: false,
    hidePermanently: false,
    is2FAEnabled: false,
    is2FAAuthenticated: false,
    open2FAModal: false,

    set2faModalOpen: (isOpen) => set({ is2faModalOpen: isOpen }),
    setHidePermanently: (hide: boolean) => set({ hidePermanently: hide }),
    setIs2FAEnabled: (isEnabled) => set({ is2FAEnabled: isEnabled }),
    setIs2FAAuthenticated: (isAuthenticated) =>
        set({ is2FAAuthenticated: isAuthenticated }),
    setOpen2FAModal: (open) => set({ open2FAModal: open }),
});

export const use2faStore = create<TfaState>()(
    devtools(persist(storeApi, { name: "2fa-store" }))
);
