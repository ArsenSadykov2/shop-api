import express from "express";
import Category from "../models/Category";
import {Error} from "mongoose";


const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res, next) => {
    try{
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        next(e);
    }

});

categoryRouter.post('/', async (req, res, next) => {
    try{
        const newCategory = {
            title: req.body.title,
            description: req.body.description,
        };

        const category = new Category(newCategory);
        await category.save();
        res.send(category);
    } catch (e) {
        if(e instanceof Error.ValidationError || e instanceof Error.CastError) {
            res.status(400).send({message: e});
            return;
        }

        next(e);
    }

});

export default categoryRouter;