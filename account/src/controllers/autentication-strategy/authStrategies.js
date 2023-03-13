import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import users from '../../models/Users.js'


async function verificationPassword(senha, hashed) {
    return await bcrypt.compare(senha, hashed)
}


const localStrategy = new LocalStrategy(
        {
            usernameField: "nome",
            passwordField: "senha",
            session: false,
        }, async (name, senha, done) => {
            console.log('vamo')
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
                console.log('aqui')
                done(err);
            }
        }
    )





export default localStrategy;















