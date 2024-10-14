import { PurpleError } from "@/types";
import { FormMessage } from "../form";

interface ErrorMessageProps {
    error: PurpleError;
    source: string;
}

export const ErrorMessage = ({ error, source }: ErrorMessageProps) => {
    return (
        <>
            {error && error.source === source ? (
                <FormMessage>{error.message}</FormMessage>
            ) : (
                <FormMessage />
            )}
        </>
    );
};
