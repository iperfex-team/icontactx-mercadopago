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

interface DataTableConfirmModalProps<TData> {
    children: React.ReactNode;
    row: Row<TData>;
    onConfirm: (value: Row<TData>) => void;
}
export const DataTableConfirmModal = <TData,>({
    row,
    onConfirm,
    children,
}: DataTableConfirmModalProps<TData>) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {lang("actions.delete.title")}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {lang("actions.delete.text")}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {" "}
                        {lang("actions.delete.cancel")}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => onConfirm(row)}>
                        {lang("actions.delete.confirm")}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
