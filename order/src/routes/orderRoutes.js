import express from 'express';
import orderController from '../controller/orderController';

const router = express.Router()

router
    .get('/order', orderController.getAllOrders);

export default router;