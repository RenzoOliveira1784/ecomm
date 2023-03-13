// concentrar todas as rotas da aplicação
import express from "express";
import users from "./userRouter.js";

const routes = (app) => {
    app.route('/').get((req, res) => {
        res.status(200).json({titulo: "User area"});
    })

    app.use(
        users
    )

}

export default routes;