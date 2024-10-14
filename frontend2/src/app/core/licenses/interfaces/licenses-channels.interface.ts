export interface LicenseChannel {
    license: LicenseChannelData[];
    status: number;
}

export interface LicenseChannelData {
    value: string;
    label: string;
}
