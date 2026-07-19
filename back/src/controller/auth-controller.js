const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");

exports.login = async (req, res, next) => {
    try{
        const { username, password } = req.body;

        if (!username || !password) {
            return createError(400, "username and password are required");
        }

        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (username !== validUsername || password !== validPassword) {
            return createError(401, "Invalid username or password");
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h'
        });

        res.json({ message: "Login success", token});
    } catch (err) {
        next(err);
    }
};