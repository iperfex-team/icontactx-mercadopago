export interface Users {
    data: UserData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface UserData {
    id: number;
    company: string;
    fullname: string;
    level: number;
    enabled: number;
    country: string;
    country_iso: string;
    country_flag: string;
    creation_date: Date;
    last_login: Date;
}
