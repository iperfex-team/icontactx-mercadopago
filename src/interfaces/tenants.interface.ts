export interface Tenants {
    status: number;
    tenants: Tenant[];
}

export interface Tenant {
    value: string;
    label: string;
}
