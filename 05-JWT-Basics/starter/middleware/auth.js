const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new CustomAPIError('No token provided', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            id: decoded.id, 
            username: decoded.username
        };
        next();
    } catch (error) {
        throw new CustomAPIError('Token is invalid', 401);
    }
}

module.exports = authenticationMiddleware;