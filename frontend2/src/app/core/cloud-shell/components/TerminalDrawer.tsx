import { useEffect, useRef, useState } from "react";
import { Button } from "@/components";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { LucideSquareX } from "lucide-react";
import { IoTerminalOutline, IoRemoveOutline } from "react-icons/io5";
import { useCloudShellStore } from "@/store";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const TerminalDrawer = () => {
    const [height, setHeight] = useState<number>(50); // Altura inicial en px
    const drawerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef<boolean>(false);
    const sessionData = useCloudShellStore((state) => state.session);
    const cloudShellIsOpen = useCloudShellStore(
        (state) => state.cloudShellIsOpen
    );
    const openCloudShell = useCloudShellStore((state) => state.openCloudShell);
    const closeSession = useCloudShellStore((state) => state.closeSession);

    const startDrag = (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;
    };

    const onDrag = (e: MouseEvent) => {
        if (isDragging.current) {
            setHeight((prevHeight) => prevHeight - e.movementY);
        }
    };

    const endDrag = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", endDrag);
        return () => {
            window.removeEventListener("mousemove", onDrag);
            window.removeEventListener("mouseup", endDrag);
        };
    }, []);

    return (
        <Drawer modal={false} open={cloudShellIsOpen}>
            <DrawerContent
                style={{ height: `${height}%` }}
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
                    ref={drawerRef}
                    style={{
                        height: `${height}%`,
                        transition: isDragging.current ? "none" : "height 0.2s",
                        overflow: "auto",
                        backgroundColor: "#31353d", // Cambia el color según tus necesidades
                    }}
                >
                    <div
                        onMouseDown={startDrag}
                        style={{
                            height: "2px",
                            cursor: "ns-resize",
                            backgroundColor: "#ccc",
                        }}
                    />
                    <div
                        className="bg-[#31353d] text-white scrollbar-transparent grid"
                        style={{ minHeight: `${height}%` }}
                    >
                        {/* Contenido del Drawer */}
                        <div style={{ display: "contents" }}>
                            <iframe
                                className={`w-full h-full bg-[#31353d] text-white scrollbar-transparent flex flex-1 min-h-[${height}%]`}
                                src={`${baseURL}/webssh/cloudshell?token=${sessionData?.token}`}
                            />
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};
