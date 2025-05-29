export interface Product {
    id: string;
    title: string;
    description: string;
    ingredients: {name: string; amount: string}[];
    image: string | null;
}

export interface ProductMutation {
    title: string;
    description: string
    ingredients: string[{ingredient: string, amount: number}];
    image: File | null;
}

