import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store";
import { AuthForm } from "@/types";
import { AuthFormSchema } from "@/types/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { PurpleError } from "../types/index";
import { Navigate, useNavigate } from "react-router-dom";
import { Loading } from "@/components";

export const LoginView = () => {
    const { t } = useTranslation();

    const initialValues: AuthForm = {
        email: "",
        password: "",
    };

    const form = useForm({
        resolver: zodResolver(AuthFormSchema),
        defaultValues: initialValues,
    });

    const loginUser = useAuthStore((state) => state.loginUser);
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const onSubmit = async (data: AuthForm) => {
        try {
            
            return user?.level === 2 || user?.level === 3
                ? navigate("/products")
                : navigate("/product-pay");
        } catch (error) {
            // TODO: Handle errors from API dynamically
            const errors: PurpleError[] = error as PurpleError[];
            errors.map((e) => {
                if (e.source === "email") {
                    form.setError("email", {
                        type: "manual",
                        message: e.message,
                    });
                } else {
                    form.setError("password", {
                        type: "manual",
                        message: e.message,
                    });
                }
            });
        }
    };

    const authStatus = useAuthStore((state) => state.status);
    const checkAuthStatus = useAuthStore((state) => state.checkAuthStatus);

    if (authStatus === "pending") {
        checkAuthStatus();
        return <Loading />;
    }

    if (authStatus === "authorized") {
        return <Navigate to={"/product-pay"} />;
    }

    return (
        <>
            <main className="flex flex-col items-center justify-center flex-1 min-h-screen p-24">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2
                        className={`mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-slate-900`}
                    >
                        {t("login.title")}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Form {...form}>
                        <form
                            method="POST"
                            noValidate
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 gap-y-6">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="email">
                                                {t("login.form.email.label")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    {...field}
                                                    placeholder={t(
                                                        "login.form.email.placeholder"
                                                    )}
                                                />
                                            </FormControl>
                                            {form.formState.errors.email && (
                                                <FormMessage>
                                                    {
                                                        form.formState.errors
                                                            .email.message
                                                    }
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                ></FormField>

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel htmlFor="password">
                                                {t("login.form.password.label")}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    {...field}
                                                    placeholder="********"
                                                />
                                            </FormControl>
                                            {form.formState.errors.password && (
                                                <FormMessage>
                                                    {
                                                        form.formState.errors
                                                            .password.message
                                                    }
                                                </FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                ></FormField>
                            </div>

                            <div className="mt-4">
                                <Button type="submit">
                                    {t("login.form.submit")}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </main>
        </>
    );
};
