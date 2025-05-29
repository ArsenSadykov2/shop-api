import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Product, ProductMutation} from "../../types";

export const fetchAllProducts = createAsyncThunk<Product[], void>(
    'products/fetchAllProducts',
    async() => {
        const response = await axiosApi.get<Product[]>('/products');
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

        formData.append('title', productToAdd.title);
        formData.append('description', productToAdd.description);


        if (productToAdd.ingredients && productToAdd.ingredients.length > 0) {
            formData.append('ingredients', JSON.stringify(productToAdd.ingredients));
        } else {
            formData.append('ingredients', JSON.stringify([]));
        }

        if (productToAdd.image) {
            formData.append('image', productToAdd.image);
        }

        await axiosApi.post('/products', formData);
    }
);