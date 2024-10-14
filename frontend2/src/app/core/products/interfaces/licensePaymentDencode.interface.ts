export interface LicensePaymentDencode {
    data: Dencode;
    status: number;
}

export interface Dencode {
    channel: string;
    device: string;
    expiration: string;
    license: string;
    license_description: string;
    license_name: string;
    mp_country_pay: CountryPayment[]; // Nuevo campo agregado
    price: string;
    tenant: string;
    uuid: string;
}

export interface CountryPayment { // Nueva interfaz para el array 'mp_country_pay'
    code: string;
    name: string;
    price: string;
}
