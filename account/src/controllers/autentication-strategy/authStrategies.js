import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import users from '../../models/Users.js'
import jwt from 'jsonwebtoken'

async function verificationPassword(senha, hashed) {
    return await bcrypt.compare(senha, hashed)
}


const localStrategy = new LocalStrategy(
        {
            usernameField: "name",
            passwordField: "senha",
            session: false,
        }, async (name, senha, done) => {
            const user = await users.findOne({nome: name})
            try {    
                if (!user) {
                    return done(null, false, {message:`Cannot find user with name - ${name}`})
                }
                const verifyPassword = await verificationPassword(senha, user.senha)
                if (!verifyPassword) {
                    throw console.error("Wrong paswword");
                }
                done(null, user)
            } catch (err) {
                done(err);
            }
        }
    )

    const bearerStrategy = new BearerStrategy (
        async (token, done) => {
            try {
                const payload = jwt.verify(token, process.env.KEY_JWT);
                const user = await users.findOne({ _id: payload.id });
                done(null, user);
            } catch (erro) {
            done(erro);
            }
            
        }
    )





export {localStrategy, bearerStrategy};















