import express from "express";
import {Ingredient, ProductWithoutId} from "../types";
import {imagesUpload} from "../multer";
import mongoDb from "../mongoDb";
import {ObjectId} from "mongodb";
import Product from "../models/Product";
import {Error} from "mongoose";

const productRouter = express.Router();

productRouter.get('/', async (req, res, next) => {
    try{
        const products = await Product.find();
        res.send(products);
    } catch (e){
        next(e);
    }
});

productRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;

    try{
        const product = await Product.findOne({ _id: id });

        if(product){
            res.send(product);
            return;
        } else {
            res.status(404).send({message: "Product not found"});
        }
    } catch (e){
        next(e);
    }
});

productRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const newProduct: ProductWithoutId = {
            title: req.body.title,
            // user: req.body.user,
            description: req.body.description,
            ingredients: req.body.ingredients,
            image: req.file ? 'images/' + req.file.filename : null,
        };
        const product = new Product(newProduct);
        await product.save();
        res.send(product);
    } catch (e) {
        if(e instanceof Error.ValidationError) {
            res.status(400).send({message: e});
            return;
        }
        next(e);
    }
});

export default productRouter;