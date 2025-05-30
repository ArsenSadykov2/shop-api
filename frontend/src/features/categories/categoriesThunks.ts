import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import type {Category} from "../../types";

export const fetchAllCategories = createAsyncThunk<Category[], void>(
    'categories/fetchAllCategories',
    async() => {
        const response = await axiosApi.get<Category[]>('/categories');
        return response.data;
    }
);