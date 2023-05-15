import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

router
    .get("/products", ProductController.listProducts)
    .get("/products/:id", ProductController.listProductById)
    .post("/products", ProductController.insertProduct)
    .put("/products/:id", ProductController.updateProduct)
    .delete("/products/:id", ProductController.deleteProduct)
export default router; 