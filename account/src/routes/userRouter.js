//o que vai acontecer a cada rota
import express from "express";
import UserController from "../controllers/userController.js"
import  middleware from "../controllers/autentication-strategy/authMiddlewares.js";
const router = express.Router();

router
    .get("/users", middleware.bearer, UserController.listUsers)
    .get("/users/:id", UserController.listUserById)
    .post("/users", UserController.insertUser)
    .put("/users/:id", middleware.bearer, UserController.updateUser)
    .delete("/users/:id", middleware.bearer, UserController.deleteUser)

    .post("/users/login", middleware.local, UserController.login);
    


export default router;