export interface Pays {
    data: Pay[];
    status: string
}

export interface Pay {
    description: string;
    logo: string;
    name: string;
    url_redirect: string;
}
