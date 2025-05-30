import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new mongoose.Schema({
    title: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        validate: {
            validator: async (value: string) => {
                const category = await Category.findOne({title: value});
                if (category) return false;
                return true;
            },
            message: "Category is unique",
        }
    },
    description: String,
})

const Category = mongoose.model("Category", CategorySchema);
export default Category;