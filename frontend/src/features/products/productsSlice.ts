import type { Product } from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {createProduct, fetchAllProducts} from "./productsThunks.ts";

interface ProductsState {
    items: Product[];
    fetchLoading: boolean;
    createLoading: boolean;

}

const initialState: ProductsState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllProducts.fulfilled, (state, {payload: products}) => {
                state.items = products;
                state.fetchLoading = false;
            })
            .addCase(createProduct.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createProduct.fulfilled, (state) => {
                state.createLoading = false;
            })
            .addCase(createProduct.rejected, (state) => {
                state.createLoading = false;
            })

    }
});

export const productsReducer = productsSlice.reducer;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;