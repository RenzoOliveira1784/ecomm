import mongoose from "mongoose";

const userSchema = new mongoose.Schema (
    {
        id: {type: String},
        nome: {type: String, required: true},
        email: {type: String, required: true},
        senhaHash: {type: String},
        dataCriacaoUsuario: {type: Date},
        cpf: {type: String},
        telefone: {type: String},
        endereco: {
            rua: {type: String, required: true},
            numero: {type: String, required: true},
            complemento: {type: String},
            cep: {type: String},
            cidade: {type: String, required: true},
            estado: {type: String, required: true},
        }
    }


)

const users = mongoose.model('Usuario', userSchema, 'Usuario')
export default users;