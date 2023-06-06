import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        id: { type: String },
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        userCreationDate: {type: Date},
        cpf: {type: String},
        phoneNumber: {type: String},
        address: {
            street: {type: String, required: true},
            number: {type: String, required: true},
            complement: {type: String},
            cep: {type: String},
            city: {type: String, required: true},
            state: {type: String, required: true},
        }
    }


)

const users = mongoose.model('user', userSchema, 'user')
export default users;