import mongoose from "mongoose";

const productSchema = new mongoose.Schema (
    {   
        id: {type: String},
        productName: {type: String, required: true},
        productDescription: {type: String},
        slug: {type: String},
        unitPrice: {type: Number},
        stockQuantity: {type: Number},
        category: { type: mongoose.Schema.Types.ObjectId }
    }, 
    {
        versionKey: false
    }
)


const products = mongoose.model('products', productSchema, 'product') 

export default products;