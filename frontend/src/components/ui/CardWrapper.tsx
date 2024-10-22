import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./card";
import { IoArrowBackOutline, IoReloadOutline } from "react-icons/io5";

interface CardWrapperProps {
    children: React.ReactNode;
    // label: string;
    title: string;
    // backButtonHref: string;
    description?: string;
    actionLabel?: string;
    actionHref?: string;
    reload?: boolean;
    goBack?: boolean;
}

export const CardWrapper = ({
    children,
    title,
    description,
    actionLabel,
    actionHref,
    reload,
    goBack,
}: // backButtonHref,
// label,
// title,
CardWrapperProps) => {
    const navigate = useNavigate();

    return (
        <Card key={"card-wrapper"}>
            <CardHeader className="border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between -mt-2 -ml-4 sm:flex-nowrap">
                    <div className="mt-2 ml-4">
                        <CardTitle className="text-base font-semibold leading-6 text-gray-900">
                            {title}
                        </CardTitle>
                        {description && (
                            <CardDescription>{description}</CardDescription>
                        )}
                    </div>
                    <div id="actions" className="flex items-center gap-x-2">
                        {actionLabel && actionHref && (
                            <div className="flex-shrink-0 mt-2">
                                <Button asChild>
                                    <Link to={actionHref}>{actionLabel}</Link>
                                </Button>
                            </div>
                        )}
                        {reload && (
                            <div className="flex-shrink-0 mt-2">
                                <Button
                                    variant={"ghost"}
                                    size={"icon"}
                                    onClick={() => window.location.reload()}
                                >
                                    <IoReloadOutline className="w-6 h-6 text-slate-700 hover:text-slate-600" />
                                </Button>
                            </div>
                        )}
                        {goBack && (
                            <div className="flex-shrink-0 mt-2">
                                <Button
                                    variant={"default"}
                                    size={"icon"}
                                    onClick={() => navigate(-1)}
                                >
                                    <IoArrowBackOutline className="w-6 h-6" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="py-16">{children}</CardContent>
        </Card>
    );
};
