import express from 'express';
import order from '../model/order.js'

const routes = (app) => {
    app.use(express.json(), order)
}

export default routes;