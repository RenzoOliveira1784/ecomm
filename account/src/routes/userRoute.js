//o que vai acontecer a cada rota
import express from "express";
import UserController from "../controllers/userController.js"
import passport from "passport";
import localStrategy from "../controllers/autentication-strategy/authStrategies.js";
import  middleware from "../controllers/autentication-strategy/authMiddlewares.js";
const router = express.Router();

router
    .get("/users", UserController.listUsers)
    .get("/users/:id", UserController.listUserById)
    .post("/users", UserController.insertUser)
    .put("/users/:id", UserController.updateUser)
    .delete("/users/:id", UserController.deleteUser)

    .post("/users/login", middleware.local, UserController.login);

export default router;