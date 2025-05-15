export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

export interface ProductMutation {
    title: string;
    price: number;
    description: string
}