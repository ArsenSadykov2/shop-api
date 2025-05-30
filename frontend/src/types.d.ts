export interface Product {
    _id: string;
    category: {
        _id: string;
        title: string;
    }
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

export interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string;
    password: string;
    role: string;
    googleId: string;
}

export interface ProductMutation {
    category: string;
    title: string;
    description: string
    ingredients: {name: string; amount: string}[];
    image: File | null;
}

