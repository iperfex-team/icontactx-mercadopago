export interface DeviceLogs {
    data: DeviceLogsData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface DeviceLogsData {
    command: string;
    creation_date: Date;
    device: string;
    ip: string;
    parameter: string;
    status: string;
    response: string;
}
