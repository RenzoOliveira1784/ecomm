import mongoose from "mongoose";

const productSchema = new mongoose.Schema (
    {   
        id: {type: String},
        nomeProduto: {type: String, required: true},
        descricaoProduto: {type: String},
        slug: {type: String},
        precoUnitario: {type: Number},
        quantidadeEmEstoque: {type: Number},
        categoria: {type: mongoose.Schema.Types.ObjectId, ref: "categories"}
    }, 
    {
        versionKey: false
    }
)


const products = mongoose.model('products', productSchema, 'product') 

export default products;