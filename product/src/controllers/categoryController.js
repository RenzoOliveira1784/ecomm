//Implementação dos métodos

import categories from "../models/Categories.js";

function validationName(name) {
    let regex = /^\D.../gm
    return regex.test(name)
}

class CategoryController {
    
    static listCategories = (req, res) => {
        categories.find((err, result) => {
            res.status(200).json(result);
        })
    }

    static listCategoryById = (req, res) => {
        const id = req.params.id;
        categories.findById(id, (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                res.status(400).send({message: `${err.message} - Id da categoria não encontrada`})
            }
        })
    }


    static insertCategory = (req, res) => {
        let category = new categories(req.body);
        if (validationName(category.categoryName) == false) {
            res.status(400).send({message: `Name validation failed`})
        } else {
            category.save((err) => {
                if (err) {
                    res.status(500).send({message: `${err.message} - fail to insert category`})
                } else {
                    res.status(201).send(category.toJSON())
                }
            })
        }
    }

    static updateCategory = (req, res) => {
        const id = req.params.id;
        categories.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err) {
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: `Category updated sucessfully`})
            }
        })
    }

    static activateCategory = (req, res) => {
        const id = req.params.id;
        categories.findByIdAndUpdate(id, {$set: {"statusCategory": "ATIVA"}}, (err) => {
            if (err) {
                res.status(500).send({message: `${err.message} - fail to activate category`})
            } else {
                res.status(200).send({message: `Category status activated sucessfully`})
            }
        })
    }

    static deleteCategory = (req, res) => {
        const { id } = req.params
        categories.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: `Category deleted sucessfully`})
            }
        })
    }

}

export default CategoryController;