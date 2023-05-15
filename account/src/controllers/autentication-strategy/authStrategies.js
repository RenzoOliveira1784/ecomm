import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import users from '../../models/Users.js'
import jwt from 'jsonwebtoken'

async function verificationPassword(password, hashed) {
    return await bcrypt.compare(password, hashed)
}


const localStrategy = new LocalStrategy(
        {
            usernameField: "name",
            passwordField: "password",
            session: false,
        }, async (name, password, done) => {
            const user = await users.findOne({name: name})
            try {    
                if (!user) {
                    return done(null, false, {message:`Cannot find user with name - ${name}`})
                }
                const verifyPassword = await verificationPassword(password, user.password)
                if (!verifyPassword) {
                    throw console.error("Wrong password");
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















