export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
}

export interface ProductMutation {
    title: string;
    description: string
    price: number;
    image: File | null;
}

