import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoHelpCircleOutline } from "react-icons/io5";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { AspectRatio } from "./aspect-ratio";
import { useLocation } from "react-router-dom";
import { useHelperStore } from "@/store";

export const Helper = () => {
    const location = useLocation();
    const helperUrl = useHelperStore((state) => state.helperUrl);
    const setHelperUrl = useHelperStore((state) => state.setHelperUrl);

    useEffect(() => {
        const locationKeys = location.pathname.split("/");
        const pathLevels = locationKeys.length;

        if (pathLevels == 2) {
            const module = location.pathname.split("/")[1];
            setHelperUrl(module, "index");
        }

        if (pathLevels == 3) {
            const module = location.pathname.split("/")[1];
            const section = location.pathname.split("/")[2];
            setHelperUrl(module, section);
        }
    }, [location.pathname, setHelperUrl]);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"link"} size={"icon"} disabled={!helperUrl}>
                    <IoHelpCircleOutline className="w-8 h-8 text-white transition-all" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-full sm:max-w-[500px] md:max-w-[700px] lg:max-w-[1000px]">
                <DialogHeader>
                    <DialogTitle>Help</DialogTitle>
                </DialogHeader>
                <AspectRatio ratio={16 / 9}>
                    {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/80myu5TvTnQ?si=MFhNYlQJ5DHYyLIw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> */}
                    {helperUrl && (
                        <iframe
                            src={
                                helperUrl ??
                                "https://www.youtube.com/embed/80myu5TvTnQ?si=MFhNYlQJ5DHYyLIw"
                            }
                            title="Help video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full h-full"
                            allowFullScreen
                        />
                    )}
                </AspectRatio>
            </DialogContent>
        </Dialog>
    );
};
