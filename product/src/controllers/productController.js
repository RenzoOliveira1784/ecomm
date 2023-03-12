import products from "../models/Products.js";
import mongoose from "mongoose";

function validationName(name) {
    let regex = /^\D.../gm
    return regex.test(name)
}
function validationSlug(slug) {
    let regex = /[\-a-zA-z0-9]/gm
    return regex.test(slug)
}
function validationPrecoUnitario(preco) {
    if (preco <= 0) {
        return false
    }
    return true
}
function validationQuantidadeEstoque(estoque) {
    if (estoque >= 10000 || estoque <= 0) {
        return false
    }
    return true
}

function validationId(id) {
    let i = mongoose.Types.ObjectId.isValid(id)
    if (i)
        return true;
    return false;
}

class ProductController {


    static listProducts =  (_req, res) => {
        products.find()
        .populate("categoria")
        .exec((_err, result) => {
            res.status(200).send(result)
        })
    }

    static listProductById = async (req, res) => {
        const id = req.params.id;
        products.findOne({_id: id}, (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                res.status(400).send({message: `${err.message} - Id da categoria não encontrada`})
            }
        })

    }

    static insertProduct = async (req, res) => {
        const product =  new products(req.body);
        let v1 = validationName(product.nomeProduto)
        let v2 = validationPrecoUnitario(product.precoUnitario)
        let v3 = validationQuantidadeEstoque(product.quantidadeEmEstoque)
        let v4 = validationSlug(product.slug)
        let v5 = validationId(product.categoria.id)

        if (v1 == false) {
            res.status(400).send({message: `Não passou na ValidationName`})
        } else if (v2 == false) {
            res.status(400).send({message: `Não passou na ValidationPrecoUnitario`})
        } else if (v3 == false) {
            res.status(400).send({message: `Não passou na ValidationQuantidadeEstoque`})
        } else if (v4 == false) {
            res.status(400).send({message: `Não passou na ValidationSlug`})
        } else if (v5 == false) {
            res.status(400).send({message: `Não passou na ValidationId`})
        } else {
            await product.save((err) => {
                if (err) {
                    res.status(500).send({message: `${message.err} - Fail to insert product`})
                } else {
                    res.status(201).send(product.toJSON());
                }
            })
        }
    }

    static updateProduct = async (req, res) => {
        let id = req.params.id;
        const product = new products(req.body);
        let v1 = validationName(product.nomeProduto)
        let v2 = validationPrecoUnitario(product.precoUnitario)
        let v3 = validationQuantidadeEstoque(product.quantidadeEmEstoque)
        let v4 = validationSlug(product.slug)
        console.log(product)
        let v5 = validationId(product.categoria.id)
        
        if (v1 == false) {
            res.status(400).send({message: `Não passou na ValidationName`})
        } else if (v2 == false) {
            res.status(400).send({message: `Não passou na ValidationPrecoUnitario`})
        } else if (v3 == false) {
            res.status(400).send({message: `Não passou na ValidationQuantidadeEstoque`})
        } else if (v4 == false) {
            res.status(400).send({message: `Não passou na ValidationSlug`})
        } else if (v5 == false) {
            res.status(400).send({message: `Não passou na ValidationId`})
        } else {
            try {
                await products.where({id})
                    .update ({...req.body}) 
                res.status(200).send({message: `Category sucessfully updated`})
            } catch (err) {
                res.status(500).send({message: `${message.err} - Fail to update product`})
            }
        }
    }

    static deleteProduct = (req, res) => {
        let { id } = req.params
        products.findByIdAndDelete(id, (err, _result) => {
            if (err) {
                res.status(500).send({message: `${message.err} - Não conseguiu fazer a exclusão do produto`})
            } else {
                res.status(200).send({message: `Product deleted sucessfully`})
            }
        })
    }
}

export default ProductController;