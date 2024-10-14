export interface DeviceLicense {
    data: DeviceLicenseData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface DeviceLicenseData {
    channels: number;
    creation_date: Date;
    expire: Date;
    license_send_count: number;
    name: string;
}
