// export interface User {
//     company: Company;
//     country: CountryItem;
//     email: string;
//     fullName: string;
//     id: number;
//     language: string;
//     level: number;
//     status: number;
//     tenant: number;
//     tenant_uuid: string;
//     typeuser: string;
// }

// export interface Company {
//     footer: string;
//     logo: string;
//     logoMini: string;
//     name: string;
// }

// export interface CountryItem {
//     code: string;
//     name: string;
//     timezone: string;
// }

export type User = {
    company: Company;
    core_account_settings: string;
    core_my_products: string;
    country: UserCountry;
    customer_number: number;
    email: string;
    fullName: string;
    id: number;
    language: string;
    level: number;
    license: License;
    pay_history: string;
    status: number;
    support_chat: string;
    support_email: string;
    tenant: number;
    tenant_uuid: string;
    typeuser: string;
};

export type Company = {
    footer: string;
    logo: string;
    logoMini: string;
    name: string;
};

export type UserCountry = {
    code: string;
    name: string;
    timezone: string;
};

export type License = {
    Name: string;
    Platform: string;
    channels: string;
    creationDate: Date;
    device: string;
    expire: Date;
};
