export interface Ingredient {
    name: string;
    amount: string;
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}

export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    password: string;
    role: string;
    googleId: string;
}

export interface Product {
    _id: string;
    category: string;
    // user: User;
    title: string;
    description: string;
    ingredients: {name: string; amount: string}[];
    image: string | null;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}

export interface ProductWithoutId extends Omit<Product, '_id'> {}
