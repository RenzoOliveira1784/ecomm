import passport from "passport";
import localStrategy from "./authStrategies.js";

const middleware = {
    local: (req, res, next) => {
        
        // o problema é no middleware localStrategy
        passport.authenticate(
        localStrategy,
        { session: false },
        (error, user, info) => {
            console.log("callback")
            if (error && error.name === 'InvalidArgumentError') {
                return res.status(401).json({ error: error.message });
            }

            if (error) {
                return res.status(500).json({ error: error.message });
            }

            if (!user) {
                return res.status(400).json();
            }
            req.user = user;
            return next();
        })(req, res, next)
    }
}

export default middleware;