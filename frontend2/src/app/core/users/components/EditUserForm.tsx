import { CardWrapper } from "@/components";
import { Form } from "@/components/ui/form";
import { UserFormData } from "@/types";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/api/UserApi";
import {
    EditUserFormSchema,
    TEditUser,
    TEditUserForm,
} from "@/types/UserSchema";
import { UserEditForm } from "./UserEditFormComponent";
import { Country } from "@/interfaces";

interface EditUserFormProps {
    data: TEditUser;
    country: Country;
}

const removePasswordIfIsUndefined = (data: TEditUserForm) => {
    if (data.password === undefined || data.password === "") {
        delete data.password;
    }
    if (data.confirmpassword === undefined || data.password === "") {
        delete data.confirmpassword;
    }
    return data;
};

export const EditUserForm = ({ data, country }: EditUserFormProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { id } = useParams();

    const initialValues: TEditUserForm = {
        company: data?.company,
        confirmpassword: "",
        country: data?.country,
        email: data?.email,
        enabled: data?.enabled,
        fullname: data?.fullname,
        id: data?.id,
        language: data?.language,
        password: "",
        phone: data?.phone,
        timezone: data?.timezone,
        typeuser: data?.typeuser,
    };

    const form = useForm({
        resolver: zodResolver(EditUserFormSchema),
        defaultValues: initialValues,
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: updateUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["editUser", id] });

            toast.success(data?.data.message);
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

    const onSubmit = (data: TEditUserForm) => {
        data = removePasswordIfIsUndefined(data);

        const formData = {
            payload: data,
            id: id!,
        };

        mutation.mutate(formData);
    };

    return (
        <CardWrapper title={t("users.edit.title")} reload={true} goBack={true}>
            <Form {...form}>
                <form
                    className="p-10 bg-white rounded-lg shadow-lg"
                    onSubmit={form.handleSubmit(onSubmit)}
                    noValidate
                >
                    <UserEditForm form={form} userId={id!} country={country} />

                    <div className="mt-4">
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? (
                                <ClipLoader size={20} color="#fff" />
                            ) : null}
                            <span
                                className={`${mutation.isPending} ? 'ml-2' : ''`}
                            >
                                {t("users.form.update")}
                            </span>
                        </Button>
                    </div>
                </form>
                {/* <pre>{JSON.stringify(form.control._formValues, null, 2)}</pre> */}
            </Form>
        </CardWrapper>
    );
};
