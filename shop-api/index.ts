import express from "express";
import productRouter from "./routers/products";
import fileDb from "./fileDb";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/products', productRouter);

const run = async () => {
    await fileDb.init();

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);
    });
};

run().catch(console.error);

