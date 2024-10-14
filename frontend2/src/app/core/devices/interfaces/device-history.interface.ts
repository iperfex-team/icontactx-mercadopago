import { BIOS, Kernel } from "./device.interface";

export interface DeviceHistory {
    data: DeviceHistoryData[];
    draw: number;
    recordsFiltered: number;
    recordsTotal: number;
    status: string;
}

export interface DeviceHistoryData {
    date_connect: Date;
    device: string;
    ip: string;
    version: string;
    sysinfo: DeviceHistoryDataSysinfo;
}

export interface DeviceHistoryDataSysinfo {
    raspberrypi: Raspberrypi;
    system: System;
}

export interface Raspberrypi {
    hardware: string;
    model: string;
    revision: string;
    serial: string;
}

export interface System {
    bios: BIOS;
    board: BIOS;
    chassis: BIOS;
    cpu: {
        threads: number;
    };
    kernel: Kernel;
    memory: {
        size: number;
    };
    network: HistoryNetwork[];
    node: HistoryNode;
    os: HistoryOS;
    product: HistoryProduct;
    storage: HistoryStorage[];
    sysinfo: HistorySystemSysinfo;
}

export interface HistoryNetwork {
    driver: string;
    macaddress: string;
    name: string;
    port?: string;
    speed?: number;
}

export interface HistoryNode {
    hostname: string;
    machineid: string;
    timezone: string;
}

export interface HistoryOS {
    name: string;
    release: string;
    vendor: string;
    version: string;
}

export interface HistoryProduct {
    uuid: string;
}

export interface HistoryStorage {
    driver: string;
    name: string;
    size: number;
}

export interface HistorySystemSysinfo {
    timestamp: Date;
    version: string;
}
