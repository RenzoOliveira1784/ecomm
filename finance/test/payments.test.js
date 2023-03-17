import payments from "../models/payments.js";
import app from '../index.js'
import request from 'supertest'



beforeEach(async () => {
    await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-product?authSource=admin')
})

afterEach(async () => {
    await mongoose.connection.close();
})

