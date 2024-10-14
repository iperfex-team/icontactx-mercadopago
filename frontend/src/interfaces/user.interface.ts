export interface User {
    company: Company;
    country: CountryItem;
    email: string;
    fullName: string;
    id: number;
    language: string;
    level: number;
    status: number;
    tenant: number;
    tenant_uuid: string;
    typeuser: string;
}

export interface Company {
    footer: string;
    logo: string;
    logoMini: string;
    name: string;
}

export interface CountryItem {
    code: string;
    name: string;
    timezone: string;
}
