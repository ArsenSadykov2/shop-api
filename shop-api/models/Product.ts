import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [{name: String, amount: String}],
    },
    image: String,
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;