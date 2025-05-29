import express from "express";
import fileDb from "../fileDb";
import {Ingredient, ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    try {
        const products = await fileDb.getAllProducts();
        res.send(products);
    } catch (e) {
        console.error('Error fetching products:', e);
        res.status(500).send({error: 'Internal Server Error'});
    }
});

productRouter.get('/:id', async (req, res) => {
    try {
        const product = await fileDb.getProductById(req.params.id);

        if (!product) {
            res.status(404).send({error: 'Product not found'});
            return;
        }

        res.send(product);
    } catch (e) {
        console.error('Error fetching product:', e);
        res.status(500).send({error: 'Internal Server Error'});
    }
});

productRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    try {
        if (!req.body.title || !req.body.description) {
            res.status(400).send({error: 'Title and description are required'});
            return;
        }

        let ingredients: Ingredient[] = [];

        if (req.body.ingredients) {
            if (typeof req.body.ingredients === 'string') {
                try {
                    ingredients = JSON.parse(req.body.ingredients);
                } catch (e) {
                    res.status(400).send({error: 'Invalid ingredients JSON format'});
                    return;
                }
            }

            ingredients = ingredients.map(ingredient => ({
                name: ingredient.name || '',
                amount: ingredient.amount || ''
            }));
        }

        const newProduct: ProductWithoutId = {
            title: req.body.title,
            description: req.body.description,
            ingredients: ingredients,
            image: req.file ? 'images/' + req.file.filename : null,
            price: parseFloat(req.body.price) || 0,
        };

        const savedProduct = await fileDb.addNewProduct(newProduct);
        res.status(201).send(savedProduct);
    } catch (e) {
        console.error('Error creating product:', e);
        res.status(500).send({error: 'Internal Server Error'});
    }
});

export default productRouter;