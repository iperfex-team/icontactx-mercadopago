import { useEffect, useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UserFormData } from "@/types";
import { UseFormReturn } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Country, Timezone, UserSelectValue } from "@/interfaces";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store";

interface UserFormProps {
    form: UseFormReturn<UserFormData>;
    country: Country;
}

export const UserForm = ({ form, country }: UserFormProps) => {
    const user = useAuthStore((state) => state.user);
    const { t } = useTranslation();
    const [countries, setCountries] = useState<UserSelectValue[]>();
    const [selectedCountry, setSelectedCountry] =
        useState<UserSelectValue | null>(null);
    const [timezones, setTimezones] = useState<Timezone[] | null>(null);
    const [selectedTimezone, setSelectedTimezone] = useState<Timezone | null>(
        null
    );

    useEffect(() => {
        setCountries(country.countries);
        setTimezones(country.timezones);
        if (!selectedCountry) {
            setSelectedCountry(country.userSelectValue);
        }
        if (selectedTimezone === null) {
            const timezoneIndex = country.timezones.findIndex(
                (tz) => tz.country_code === country.userCountryCode
            );
            setSelectedTimezone(country.timezones[timezoneIndex]);
        }
        form.setValue("country", selectedCountry?.nicename ?? null);
        form.setValue("timezone", selectedTimezone?.value ?? "");
    }, [
        country.countries,
        country.userSelectValue,
        country.timezones,
        form,
        selectedTimezone,
        selectedCountry,
        country.userCountryCode,
    ]);

    return (
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="fullname">
                            {t("users.form.fullName.label")}
                        </FormLabel>{" "}
                        <FormControl>
                            <Input
                                placeholder={t(
                                    "users.form.fullName.placeholder"
                                )}
                                {...field}
                                ref={null}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="company">
                            {t("users.form.company.label")}
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder={t(
                                    "users.form.company.placeholder"
                                )}
                                {...field}
                                ref={null}
                                disabled={user?.level !== 0}
                                value={field.value || ""}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="email">
                            {t("users.form.email.label")}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                ref={null}
                                type="email"
                                placeholder={t("users.form.email.placeholder")}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="phone">
                            {t("users.form.phone.label")}
                        </FormLabel>
                        <FormControl>
                            <Input
                                placeholder="541152175880"
                                {...field}
                                ref={null}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="password">
                            {t("users.form.password.label")}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                ref={null}
                                type="password"
                                placeholder="********"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            <FormField
                control={form.control}
                name="confirmpassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="confirmpassword">
                            {t("users.form.confirmPassword.label")}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                ref={null}
                                type="password"
                                placeholder="********"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            {user?.level === 0 ? (
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="country">
                                {t("users.form.country")}
                            </FormLabel>
                            <ReactSelect
                                options={countries}
                                onChange={(selectedOption) => {
                                    console.log(selectedOption);
                                    field.onChange(selectedOption?.nicename);
                                    setSelectedCountry(selectedOption);
                                }}
                                value={selectedCountry}
                                isDisabled={user?.level !== 0}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
            ) : (
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="country">
                                {t("users.form.country")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    ref={null}
                                    disabled
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
            )}

            {user?.level === 0 ? (
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="timezone">
                                {t("users.form.timezone")}
                            </FormLabel>
                            <ReactSelect
                                options={timezones || []}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption?.value);
                                    setSelectedTimezone(selectedOption);
                                }}
                                value={selectedTimezone}
                                isDisabled={user?.level !== 0}
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
            ) : (
                <FormField
                    control={form.control}
                    name="timezone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="timezone">
                                {t("users.form.timezone")}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="text"
                                    ref={null}
                                    disabled
                                    value={field.value || ""}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
            )}

            <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="language">
                            {t("users.form.language.label")}
                        </FormLabel>
                        <FormControl>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder={t(
                                            "users.form.language.placeholder"
                                        )}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">
                                        {t("users.form.language.options.en")}
                                    </SelectItem>
                                    <SelectItem value="es">
                                        {" "}
                                        {t("users.form.language.options.es")}
                                    </SelectItem>
                                    <SelectItem value="pt">
                                        {t("users.form.language.options.pt")}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>

            {user?.level === 1 && (
                <FormField
                    control={form.control}
                    name="typeuser"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel htmlFor="typeuser">
                                {t("users.form.typeUser.label")}
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger>
                                        <SelectValue
                                            placeholder={"Type User"}
                                        />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="creation">
                                            Creation
                                        </SelectItem>
                                        <SelectItem value="reporting">
                                            Reporting
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>
            )}
        </div>
    );
};
