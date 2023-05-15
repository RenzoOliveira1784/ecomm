import passport from "passport";
import { localStrategy, bearerStrategy } from "./authStrategies.js";

const middleware = {
    local: (req, res, next) => {
        
        // o problema é no middleware localStrategy
        passport.authenticate(
            localStrategy,
            { session: false },
            (error, user, info) => {
                if (error && error.name === 'InvalidArgumentError') {
                    return res.status(401).json({ error: error.message });
                }
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                if (!user) {
                    return res.status(400).json({message: "User doesn't exist"});
                }
                req.user = user;
                return next();
            })(req, res, next)
    },
    bearer: (req, res, next) => {
        passport.authenticate(
            bearerStrategy,
            { session: false },
            (error, user, info) => {
                if (error && error.name === 'JsonWberTokenError') {
                    return res.status(401).json({ error: error.message })
                } 
                
                if (error) {
                    return res.status(500).json({ error: error.message, message: "oi" })
                }
                if (!user) {
                    return res.status(401).json({})
                }
                req.user = user
                return next()
            }
        )(req, res, next)
    }
}

export default middleware;