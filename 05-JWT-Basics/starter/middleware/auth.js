const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new UnauthenticatedError('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { 
            id: decoded.id, 
            username: decoded.username
        };
        next();
    } catch (error) {
        throw new UnauthenticatedError('No token provided');
    }
}

module.exports = authenticationMiddleware;