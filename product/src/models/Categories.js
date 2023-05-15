// regra de negócio -> validação de estrutura

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        id: {type: String},
        categoryName: {type: String, required: true},
        statusCategory: {type: String}
    }
)

const categories = mongoose.model('categories', categorySchema)

export default categories;