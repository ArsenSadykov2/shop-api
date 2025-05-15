import express from "express";
import fileDb from "../fileDb";
import {ProductWithoutId} from "../types";

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
    const products = await fileDb.getAllProducts();
    res.send(products);
});

productRouter.get('/:id',async (req, res) => {
    const product = await fileDb.getProductById(req.params.id)
    res.send(product);
});

productRouter.post('/',async (req, res) => {
    const newProduct: ProductWithoutId = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    };

    const savedProduct = await fileDb.addNewProduct(newProduct);

    res.send(savedProduct);
});

export default productRouter;