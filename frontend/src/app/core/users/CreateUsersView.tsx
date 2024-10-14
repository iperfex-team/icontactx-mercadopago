import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserFormData, userSchema } from "@/types";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { UserForm } from ".";
import { createUser } from "@/api/UserApi";
import { toast } from "react-toastify";
import { CardWrapper, Loading } from "@/components";
import { useTranslation } from "react-i18next";
import { ClipLoader } from "react-spinners";
import { useAuthStore } from "@/store";
import { useCountries } from "@/hooks";

export const CreateUsersView = () => {
    const user = useAuthStore((state) => state.user);
    const navigate = useNavigate();

    const getTimezone = () => {
        if (user?.level === 0) {
            return user?.country.timezone;
        }

        return user?.level === 1
            ? user.country.timezone
            : "America/Argentina/Buenos_Aires";
    };

    const initialValues: UserFormData = {
        fullname: "",
        company: user?.level === 1 ? user.company.name : "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        country: user?.level === 1 ? user.country.name : "",
        timezone: getTimezone(),
        language: "en",
        typeuser: "creation",
    };

    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: initialValues,
    });

    const mutation = useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            toast.success(data.data.message);
            navigate("/users");
        },
        onError: (errors) => {
            const error = errors.message.split(":");
            const [key, message] = error;

            form.setError(
                key as keyof UserFormData,
                {
                    type: "server side",
                    message,
                },
                { shouldFocus: true }
            );
            toast.error(message);
        },
    });

    const onSubmit: SubmitHandler<UserFormData> = (
        data: z.infer<typeof userSchema>
    ) => {
        mutation.mutate(data);
    };

    const { t } = useTranslation();

    const { countriesQuery } = useCountries();

    return (
        <CardWrapper title={t("users.add.title")} reload={true} goBack={true}>
            {countriesQuery.isLoading ? (
                <Loading />
            ) : (
                <Form {...form}>
                    <form
                        className="p-10 bg-white rounded-lg shadow-lg"
                        onSubmit={form.handleSubmit(onSubmit)}
                        noValidate
                    >
                        <UserForm form={form} country={countriesQuery.data!} />

                        <div className="mt-4">
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? (
                                    <ClipLoader size={20} color="#fff" />
                                ) : null}
                                <span
                                    className={`${mutation.isPending} ? 'ml-2' : ''`}
                                >
                                    {t("users.form.submit")}
                                </span>
                            </Button>
                        </div>
                    </form>
                    {/* <pre>
                        {JSON.stringify(form.control._formValues, null, 2)}
                    </pre> */}
                </Form>
            )}
        </CardWrapper>
    );
};
