export interface Devices {
    data: DeviceData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface DeviceData {
    status: boolean;
    tenant_id: number;
    tenant_uuid: string;
    company: string;
    device: string;
    platform: string;
    version: string;
    creation_date: Date;
    last_connect: Date;
    ip: string;
    count_connect: number;
    licenses: number;
    country_code: string;
    country_flag: string;
    is_free: boolean;
    customer_number: number;
}
