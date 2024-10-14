export interface Device {
    company: string;
    count_connect: number;
    country_code: string;
    country_flag: string;
    creation_date: Date;
    device: string;
    device_alias: string;
    ip: string;
    last_connect: Date;
    licenses: number;
    platform: string;
    platform_logo: string;
    sysinfo: DeviceSysinfo;
    tenant_uuid: string;
    version: string;
}

export interface DeviceSysinfo {
    system: HistorySystem;
}

export interface HistorySystem {
    bios: BIOS;
    board: Board;
    chassis: Chassis;
    cpu: CPU;
    kernel: Kernel;
    memory: Memory;
    network: Network[];
    node: Node;
    os: OS;
    product: Product;
    storage: Storage[];
    sysinfo: SystemSysinfo;
}

export interface BIOS {
    date: string;
    vendor: string;
    version: string;
}

export interface Board {}

export interface Chassis {
    type: number;
    vendor: string;
    version: string;
}

export interface CPU {
    cache: number;
    model: string;
    speed: number;
    threads: number;
    vendor: string;
}

export interface Kernel {
    architecture: string;
    release: string;
    version: string;
}

export interface Memory {
    size: number;
    type: string;
}

export interface Network {
    driver: string;
    macaddress: string;
    name: string;
}

export interface Node {
    hostname: string;
    hypervisor: string;
    machineid: string;
    timezone: string;
}

export interface OS {
    architecture: string;
    name: string;
    release: string;
    vendor: string;
    version: string;
}

export interface Product {
    name: string;
    uuid: string;
    vendor: string;
    version: string;
}

export interface Storage {
    driver: string;
    model: string;
    name: string;
    serial: string;
    size: number;
    vendor: string;
}

export interface SystemSysinfo {
    timestamp: Date;
    version: string;
}
