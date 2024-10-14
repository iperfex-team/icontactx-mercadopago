export interface Products {
    products: Product[];
}

export interface Product {
    id: number;
    name: string;
    title: string;
    description: string;
    link: string;
    lic: string;
    isActive: boolean;
}
