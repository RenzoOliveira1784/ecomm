import users from "../models/Users.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

function validationName(name) {
    let regex = /^\D.../gm
    return regex.test(name)
}
function validationEmail(email) {
    var regex = /\S+@\S+\.\S+/gm
    return regex.test(email);
}
function validationPassword(pas) {
    var regex = /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{9,}$/gm
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
    return bcrypt.hashSync(password, salt, (err) => {
        if (err) {
            console.log(`error hash ${err}`)
        }
    })
}

function createTokenJWT(user) {
    const payload = {
        id: user._id
    };
    //console.log(user._id)
    const token = jwt.sign(payload, process.env.KEY_JWT, {expiresIn: '1d'});
    return token;
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

    static login = (req, res) => {
        const token = createTokenJWT(req.user);
        res.set('Authorization', token);
        res.status(204).send();
    }

    static insertUser = (req, res) => {
        let User = new users(req.body);
        User.id = uuidv4();
        if (validationName(User.name) == false) {
            res.status(400).send({message: `Name validation failed`})
        } else if (validationEmail(User.email) == false) {
            res.status(400).send({message: `Email validation failed`})
        } else if (validationPassword(User.password) == false) {
            res.status(400).send({message: `Password validation failed`})
        } else if (validationCpf(User.cpf) == false) {
            res.status(400).send({message: `Cpf validation failed`})
        } else if (validationCep(User.address.cep) == false) {
            res.status(400).send({message: `Cep validation failed`})
        } else if (validationFone(User.phoneNumber) == false) {
            res.status(400).send({message: `PhoneNumber validation failed`})
        } else if (validationState(User.address.state) == false) {
            res.status(400).send({message: `State validation failed`})
        } else {
            let passwordHash = generateHashPassword(User.password)
            User.password = passwordHash
            User.userCreationDate = new Date();
            
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
        if (validationName(User.name) == false) {
            res.status(400).send({message: `Name validation failed`})
        } else if (validationEmail(User.email) == false) {
            res.status(400).send({message: `Email validation failed`})
        } else if (validationPassword(User.password) == false) {
            res.status(400).send({message: `Password validation failed`})
        } else if (validationCpf(User.cpf) == false) {
            res.status(400).send({message: `Cpf validation failed`})
        } else if (validationCep(User.address.cep) == false) {
            res.status(400).send({message: `Cep validation failed`})
        } else if (validationFone(User.phoneNumber) == false) {
            res.status(400).send({message: `PhoneNumber validation failed`})
        } else if (validationState(User.address.state) == false) {
            res.status(400).send({message: `State validation failed`})
        } else {
            req.body.passoword = generateHashPassword(User.password)
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