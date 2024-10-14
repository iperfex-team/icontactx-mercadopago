import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { UseFormReturn } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import ReactSelect from "react-select";
import { Country } from "@/interfaces";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store";
import { TEditUserForm } from "@/types/UserSchema";
import { Switch } from "@/components/ui/switch";

interface UserFormProps {
    form: UseFormReturn<TEditUserForm>;
    userId: string;
    country: Country;
}

export const UserEditForm = ({ form, userId, country }: UserFormProps) => {
    const user = useAuthStore((state) => state.user);
    const { t } = useTranslation();
    const countries = country.countries;
    const timezones = country.timezones;

    const countryDB = form.getValues()["country"];
    const getCountryByIndex = () => {
        const index =
            countries.findIndex((country) => country.nicename === countryDB) ||
            0;

        return countries[index];
    };
    const timezoneDB = form.getValues()["timezone"];
    const getTimezoneByIndex = () => {
        const index = timezones.findIndex((tz) => tz.value === timezoneDB) || 0;

        return timezones[index];
    };

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
                                onChange={(event) =>
                                    field.onChange(+event.target.value)
                                }
                                value={field.value || ""}
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
                                onChange={(value) => {
                                    field.onChange(value?.nicename);
                                }}
                                value={getCountryByIndex()}
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
                                }}
                                value={getTimezoneByIndex()}
                                isDisabled={user?.level !== 0}
                            />
                            {/* <Select
                                onValueChange={field.onChange}
                                // defaultValue={selectedTimezone}
                                value={field.value}
                                disabled={user?.level !== 0}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a timezone" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {timezones?.map((timezone) => (
                                        <SelectItem
                                            key={timezone.timezone}
                                            value={timezone.timezone}
                                        >
                                            {timezone.timezone}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select> */}
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

            <div className="flex items-center gap-x-4">
                {user?.id !== +userId! && (
                    <FormField
                        control={form.control}
                        name="enabled"
                        render={({ field }) => (
                            <FormItem>
                                <div className="pb-3 space-y-2">
                                    <FormLabel>
                                        {t("users.form.enabled.label")}
                                    </FormLabel>
                                </div>
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                {user?.id !== +userId! && user?.level === 1 && (
                    <FormField
                        control={form.control}
                        name="typeuser"
                        render={({ field }) => (
                            <FormItem className="flex-1">
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
        </div>
    );
};
