import { promises as fs } from 'fs';
import { existsSync } from "node:fs";
import { Product, ProductWithoutId } from "./types";
import * as crypto from "node:crypto";

const fileName = './db.json';
let data: Product[] = [];

const fileDb = {
    async init() {
        try {
            if (!existsSync(fileName)) {
                await fs.writeFile(fileName, JSON.stringify([]));
            } else {
                const fileContent = await fs.readFile(fileName);
                data = JSON.parse(fileContent.toString()) as Product[];
            }
        } catch (e) {
            data = [];
            console.error("Database initialization error:", e);
        }
    },

    async getProductById(id: string): Promise<Product | undefined> {
        await this.init();
        return data.find(product => product.id === id);
    },

    async getAllProducts(): Promise<Product[]> {
        await this.init();
        return [...data].reverse();
    },

    async addNewProduct(productData: ProductWithoutId): Promise<Product> {
        await this.init();

        const newProduct: Product = {
            id: crypto.randomUUID(),
            ...productData,
            ingredients: productData.ingredients || []
        };

        data.push(newProduct);
        await this.save();
        return newProduct;
    },

    async save() {
        try {
            await fs.writeFile(fileName, JSON.stringify(data, null, 2));
        } catch (e) {
            console.error("Failed to save database:", e);
            throw e;
        }
    }
};

export default fileDb;