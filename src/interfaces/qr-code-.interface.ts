export type QRCode = {
    data: QRCodeData;
}

export type QRCodeData = {
    key:     string;
    message: string;
    qr:      string;
    status:  number;
}
