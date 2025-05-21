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
        return response.data || null;
    }
);

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd) => {
        const formData = new FormData();

        formData.append('title', productToAdd.title);
        formData.append('description', productToAdd.description);
        formData.append('price', String(productToAdd.price));

        if(productToAdd.image) {
            formData.append('image', productToAdd.image);
        }

        await axiosApi.post('/products', formData);
    }
);