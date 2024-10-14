import { UseFormRegister, FieldErrors } from "react-hook-form";
import { IoAlertCircleOutline } from "react-icons/io5";
import clsx from "clsx";
import { UserFormData } from "@/types";

type FormProps = {
    register: UseFormRegister<UserFormData>;
    errors: FieldErrors<UserFormData>;
};

export const InputField = ({ errors, register }: FormProps) => {
    return (
        <div className="relative">
            <input
                id="fullname"
                className={clsx("w-full p-3 border border-gray-200", {
                    "border-0 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500":
                        errors.fullname,
                })}
                type="text"
                placeholder="Full Name"
                aria-invalid="true"
                aria-describedby="full-name-error"
                {...register("fullname", {
                    required: "The field is required",
                })}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <IoAlertCircleOutline
                    className="w-5 h-5 text-red-500"
                    aria-hidden="true"
                />
            </div>
        </div>
    );
};
