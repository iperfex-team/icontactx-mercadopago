export interface Licenses {
    draw: number;
    recordsTotal: number;
    recordsFiltered: number;
    data: LicensesData[];
}

export interface LicensesData {
    uuid: string;
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
    flag: boolean;
}
