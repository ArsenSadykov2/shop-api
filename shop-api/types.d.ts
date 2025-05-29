export interface Ingredient {
    name: string;
    amount: string;
}

export interface Product {
    id: string;
    title: string;
    description: string;
    ingredients: Ingredient[];
    image: string | null;
    price: number;
}

export interface ProductWithoutId extends Omit<Product, 'id'> {}
