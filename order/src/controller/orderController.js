import order from '../model/order.js'


class orderController {
    static getAllOrders = async (_req, res) => {
        try {
            const result = await order.find({});
            return res.status(200).json({result});
        } catch (err) {
            return res.status(400).send({ message: err.message });
        } 
    }
}

export default orderController;