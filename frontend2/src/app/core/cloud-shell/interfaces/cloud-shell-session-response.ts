export interface CloudShellSessionResponse {
    data: CloudShellSessionResponseData;
}

export interface CloudShellSessionResponseData {
    message: string;
    session: string;
    status: number;
    token: string;
}
