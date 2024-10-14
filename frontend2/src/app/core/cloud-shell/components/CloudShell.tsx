import { useRef } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useAuthStore, useCloudShellStore } from "@/store";
import { CloudShellLoader } from "./CloudShellLoader";
import { IoRemoveOutline, IoTerminalOutline } from "react-icons/io5";
import { useCloudShellWS } from "../hooks";
import { Button } from "@/components";
import { LucideSquareX } from "lucide-react";
import { TerminalDrawer } from "./TerminalDrawer";
// import { TerminalComponent } from "./TerminalComponent";

export const CloudShell = () => {
    const token = useAuthStore((state) => state.token);
    const icid = useAuthStore((state) => state.icid);
    const cloudShellIsOpen = useCloudShellStore(
        (state) => state.cloudShellIsOpen
    );
    const session = useCloudShellStore((state) => state.session);
    const openCloudShell = useCloudShellStore((state) => state.openCloudShell);
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const terminalReady = useCloudShellWS(terminalRef, {
        token: token ?? "",
        icid: icid ?? "",
        session,
    });
    const closeSession = useCloudShellStore((state) => state.closeSession);

    console.log({ terminalReady });

    {
        return terminalReady ? <TerminalDrawer /> : <CloudShellLoader />;
    }

    // return {terminalReady
    //         ? <CloudShellLoader />
    //         :  <TerminalDrawer />
    //     }

    <Drawer modal={false} open={cloudShellIsOpen}>
        {/* <DrawerTrigger>Open</DrawerTrigger> */}
        <DrawerContent
            style={{ height: "500px" }}
            className="bg-[#31353d] text-white scrollbar-transparent"
        >
            <DrawerHeader className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <IoTerminalOutline className="w-5 h-5" />
                    <DrawerTitle>CloudShell</DrawerTitle>
                </div>
                <div className="flex">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => openCloudShell(false)}
                    >
                        <IoRemoveOutline className="w-6 h-6" />
                    </Button>
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        onClick={() => closeSession()}
                    >
                        <LucideSquareX className="w-6 h-6" />
                    </Button>
                </div>
            </DrawerHeader>
            <div
                id="terminal"
                className="h-full overflow-y-scroll "
                ref={terminalRef}
            >
                {terminalReady ? null : <CloudShellLoader />}
            </div>
        </DrawerContent>
    </Drawer>;
};
