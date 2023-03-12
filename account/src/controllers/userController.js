import users from "../models/Users.js";
import bcrypt from 'bcryptjs'

function validationName(name) {
    let regex = /^\D.../gm
    return regex.test(name)
}
function validationEmail(email) {
    var regex = /\S+@\S+\.\S+/gm
    return regex.test(email);
}
function validationPassword(pas) {
    var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm
    return regex.test(pas)
}
function validationCpf(cpf) {
    var regex = /^[\d]{11}$/gm
    return regex.test(cpf)
}
function validationCep(num){
    var regex = /(^\d{5}\d{3}$)/gm
    return regex.test(num)
}
function validationFone(fone) {
    var regex = /^[\d]{10,13}$/gm
    return regex.test(fone)
}
function validationState(state) {
    let testState = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 
    'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO']
    const result = testState.find((one) => one.includes(state))
    if (result) {
        return true
    }
    return false
}

function generateHashPassword (password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hash(password, salt, (err) => {
        if (err) {
            console.log(`error hash ${err}`)
        } 
    })
}

class UserController {
    //implementação dos metodos
    static listUsers = (req, res) => {
        users.find((err, result) => {
            res.status(200).json(result);
        })
    }

    static listUserById = (req, res) => {
        const id = req.params.id;
        users.findById(id, (err, result) => {
            if (!err) {
                res.status(200).json(result);
            } else {
                res.status(400).send({message: `${err.message} - Id do user não encontrado`})
            }
        })
    }


    static insertUser = (req, res) => {
        let User = new users(req.body);
        if (validationName(User.nomeCategoria) == false) {
            res.status(400).send({message: `Name validation failed`})
        } else if (validationEmail(User.email) == false) {
            res.status(400).send({message: `Email validation failed`})
        } else if (validationPassword(User.senhaHash) == false) {
            res.status(400).send({message: `Password validation failed`})
        } else if (validationCpf(User.cpf) == false) {
            res.status(400).send({message: `Cpf validation failed`})
        } else if (validationCep(User.endereco.cep) == false) {
            res.status(400).send({message: `Cep validation failed`})
        } else if (validationFone(User.telefone) == false) {
            res.status(400).send({message: `PhoneNumber validation failed`})
        } else if (validationState(User.endereco.estado) == false) {
            res.status(400).send({message: `State validation failed`})
        } else {
            User.senhaHash = generateHashPassword(User.senhaHash)
            User.save((err) => {
                if (err) {
                    res.status(500).send({message: `${err.message} - fail to insert User`})
                } else {
                    res.status(201).send(User.toJSON())
                }
            })
        }
    }

    static updateUser = (req, res) => {
        const id = req.params.id;
        let User = new users(req.body);
        if (validationName(User.nomeCategoria) == false) {
            res.status(400).send({message: `Name validation failed`})
        } else if (validationEmail(User.email) == false) {
            res.status(400).send({message: `Email validation failed`})
        } else if (validationPassword(User.senhaHash) == false) {
            res.status(400).send({message: `Password validation failed`})
        } else if (validationCpf(User.cpf) == false) {
            res.status(400).send({message: `Cpf validation failed`})
        } else if (validationCep(User.endereco.cep) == false) {
            res.status(400).send({message: `Cep validation failed`})
        } else if (validationFone(User.telefone) == false) {
            res.status(400).send({message: `PhoneNumber validation failed`})
        } else if (validationState(User.endereco.estado) == false) {
            res.status(400).send({message: `State validation failed`})
        } else {
            req.body.senhaHash = generateHashPassword(User.senhaHash)
            users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
                if(err) {
                    res.status(500).send({message: err.message})
                } else {
                    res.status(200).send({message: `User updated sucessfully`})
                }
            })
        }
    }
    

    static deleteUser = (req, res) => {
        const { id } = req.params
        users.findByIdAndDelete(id, (err) => {
            if (err) {
                res.status(500).send({message: err.message})
            } else {
                res.status(200).send({message: `User deleted sucessfully`})
            }
        })
    }


}



export default UserController;