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

export const createProduct = createAsyncThunk<void, ProductMutation>(
    'products/createProduct',
    async (productToAdd, {dispatch}) => {
        await axiosApi.post('/products', productToAdd);
        dispatch(fetchAllProducts());
    }
);