const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const auth = {
    isAuthenticated: (req, res, next) => {

        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "No Token provided" });
        }

        const validateToken = JWT.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Token" })
            }

            req.userId = decoded.id;
  
            next();
        })


    }
}

module.exports = auth;