import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        date: { type: Date },
        clientId: { type: String },
        address: {
            street: { type: String },
            number: { type: String },
            complement: { type: String },
            cep: { type: String },
            city:{ type: String },
            state: { type: String },
        },
        items: [{
            productId: { type: String },
            quantity: { type: Number },
            discount: { type: Number },
            unitPrice: { type: Number },
        }]
    }
)

const order = mongoose.model('order', orderSchema);

export default order;

