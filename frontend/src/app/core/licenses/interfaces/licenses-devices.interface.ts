export interface LicenseDevice {
    license: LicenseDeviceData[];
    status: number;
}

export interface LicenseDeviceData {
    value: string;
    label: string;
}
