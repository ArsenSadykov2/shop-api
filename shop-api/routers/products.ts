import express, {Request} from "express";
import {ProductWithoutId, UserFields} from "../types";
import {imagesUpload} from "../middleware/multer";
import Product from "../models/Product";
import {Error, HydratedDocument} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";

const productRouter = express.Router();

productRouter.get('/', auth , async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;
        const category_id = req.query.category as string;
        const filter: {category?: string} = {};

        if(category_id){
            filter.category = category_id;
        }

        const products = await Product.find(filter).populate('category', 'title',);
        res.send({products, user});
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
            category: req.body.category,
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
        if(e instanceof Error.ValidationError || e instanceof Error.CastError) {
            res.status(400).send({message: e});
            return;
        }
        next(e);
    }
});

export default productRouter;