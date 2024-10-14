import { toast } from "react-toastify";

export const copyJsonToClipboard = (json: object) => {
    const jsonString = JSON.stringify(json, null, 2);
    // const el = document.createElement("textarea");
    // el.value = jsonString;
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand("copy");
    // document.body.removeChild(el);

    navigator.clipboard.writeText(jsonString);
    toast.success("JSON copied to clipboard");
};
