import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Product, ProductMutation} from "../../types";

export const fetchAllProducts = createAsyncThunk<Product[], string | undefined>(
    'products/fetchAllProducts',
    async (category_id) => {
        const response = await axiosApi.get<Product[]>(
            category_id ? `/products?category=${category_id}` : '/products'
        );
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk<Product, string>(
    'products/fetchProductById',
    async(product_id) => {
        const response = await axiosApi.get<Product>('/products/' + product_id);
        return response.data;
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd) => {
        const formData = new FormData();

        formData.append('category', productToAdd.category);
        formData.append('title', productToAdd.title);
        formData.append('description', productToAdd.description);

        productToAdd.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][amount]`, ingredient.amount);
        });

        if (productToAdd.image) {
            formData.append('image', productToAdd.image);
        }

        await axiosApi.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }
);