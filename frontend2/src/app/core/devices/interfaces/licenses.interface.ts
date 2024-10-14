export interface Licenses {
    data: LicensesData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface LicensesData {
    id_license: number;
    id_device: number;
    tenant_uuid: string;
    enabled: number;
    license_send_count: number;
    company: string;
    name: string;
    device: string;
    channels: number;
    creation_date: Date;
    expire: Date;
}
