import { IoCopyOutline, IoInformationCircleOutline } from "react-icons/io5";
import { Button } from "./button";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import ReactJson from "@microlink/react-json-view";
import { copyJsonToClipboard } from "@/helpers";

export const JsonFormatterModal = ({ data }: { data: string }) => {
    const src = JSON.parse(data);
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"ghost"} size={"icon"}>
                    <IoInformationCircleOutline className="w-6 h-6 text-green-500" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[48rem] overflow-y-scroll">
                <Button
                    variant={"ghost"}
                    size={"icon"}
                    onClick={() => copyJsonToClipboard(src)}
                >
                    <IoCopyOutline className="w-4 h-4 text-green-500" />
                </Button>
                <ReactJson
                    src={src}
                    theme="rjv-default"
                    displayDataTypes={false}
                    displayObjectSize={false}
                    name={false}
                    enableClipboard={false}
                ></ReactJson>
            </DialogContent>
        </Dialog>
    );
};
