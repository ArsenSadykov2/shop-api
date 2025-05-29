export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    image?: string | null;
}

export interface ProductMutation {
    title: string;
    description: string
    price: number;
    image: File | null;
}

