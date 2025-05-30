import mongoose from 'mongoose';
import express from "express";
import productRouter from "./routers/products";
import cors from "cors";;

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/products', productRouter);

const run = async () => {
    await mongoose.connect('mongodb://localhost/homework-96');

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoose.disconnect();
    });
};

run().catch(console.error);

