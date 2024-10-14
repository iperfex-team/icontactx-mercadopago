export interface LicenseExpiration {
    license: LicenseExpirationData[];
    status: number;
}

export interface LicenseExpirationData {
    value: string;
    label: string;
}
