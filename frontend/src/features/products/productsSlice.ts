import type { Product } from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../app/store.ts";
import {createProduct, fetchAllProducts, fetchProductById} from "./productsThunks.ts";

interface ProductsState {
    items: Product[];
    item: Product | null;
    fetchLoading: boolean;
    createLoading: boolean;

}

const initialState: ProductsState = {
    items: [],
    item: null,
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
            .addCase(fetchProductById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, {payload: product}) => {
                state.item = product;
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
export const selectOneProducts = (state: RootState) => state.products.item;
export const selectProductsLoading = (state: RootState) => state.products.fetchLoading;