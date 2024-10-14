export interface LicenseTracking {
    data: LicenseTrackingData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface LicenseTrackingData {
    device: string;
    channels: number;
    creation_date: Date;
    expire: Date;
    expireString: string;
}
