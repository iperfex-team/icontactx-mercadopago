import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { lang } from "@/helpers";
import { Row } from "@tanstack/react-table";

interface ConfirmModalProps<TData> {
    children: React.ReactNode;
    row: Row<TData>;
    onConfirm: (value: Row<TData>) => void;
}
export const RestartLicenseModalComponent = <TData,>({
    row,
    children,
    onConfirm,
}: ConfirmModalProps<TData>) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {lang("actions.restart.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>{lang("actions.restart.text1")}</p>

                        <p className="mt-4">{lang("actions.restart.text2")}</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {" "}
                        {lang("actions.restart.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm(row)}>
                        {lang("actions.restart.confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
